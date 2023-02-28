import { createTRPCRouter } from './trpc';
import { dataRouter } from './routers/data';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  data: dataRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
