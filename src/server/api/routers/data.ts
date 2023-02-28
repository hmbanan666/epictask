import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { Tasks } from '../../data/tasks';

export const dataRouter = createTRPCRouter({
  task: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => Tasks.find((task) => task.id === input.id)),
  tasks: publicProcedure.query(() => Tasks),
});
