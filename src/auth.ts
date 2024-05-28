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
      const checkIfAPIKeyExists = await prisma.user.findUnique({
        where: {
          id: user?.id,
        },
      });

      if (!checkIfAPIKeyExists?.apiKey) {
        await prisma.user.update({
          where: {
            id: user?.id,
          },
          data: {
            apiKey: generateApiKey(),
          },
        });
      }
      return true;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  adapter: PrismaAdapter(Prisma),
  providers: [Google],
  session: { strategy: 'jwt' },
});
