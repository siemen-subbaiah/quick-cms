import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    apiKey?: string;
  }

  interface Session {
    user: {
      id: string;
      apiKey?: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    apiKey?: string;
  }
}
