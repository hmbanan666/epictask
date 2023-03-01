import { type GetServerSidePropsContext } from 'next';
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from './db';
// eslint-disable-next-line import/extensions
import { env } from '../env.mjs';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      surname?: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    username: string;
    surname?: string;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        // eslint-disable-next-line no-param-reassign
        session.user.id = user.id;
        // eslint-disable-next-line no-param-reassign
        session.user.username = user.username;
        // eslint-disable-next-line no-param-reassign
        session.user.surname = user.surname;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clientId: env.GITHUB_ID,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => getServerSession(ctx.req, ctx.res, authOptions);
