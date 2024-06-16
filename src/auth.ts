import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import prisma from './config/db';
import { generateApiKey } from './lib/utils';

const Prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const currentUser = await prisma.user.findUnique({
        where: {
          id: user?.id,
        },
      });

      user.apiKey = currentUser?.apiKey as string;
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.apiKey = user.apiKey;
      }
      return token;
    },

    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          apiKey: token.apiKey,
        },
      };
    },
  },
  events: {
    async createUser({ user }) {
      const newKey = generateApiKey();
      await prisma.user.update({
        where: { id: user.id },
        data: { apiKey: newKey },
      });
    },
  },
  adapter: PrismaAdapter(Prisma),
  providers: [Google],
  session: { strategy: 'jwt' },
});
