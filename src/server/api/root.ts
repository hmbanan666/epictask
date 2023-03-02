import { createTRPCRouter } from './trpc';
import { epicRouter } from './routers/epic';
import { taskRouter } from './routers/task';
import { userRouter } from './routers/user';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  epic: epicRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
