import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const dataRouter = createTRPCRouter({
  epic: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const epic = await ctx.prisma.epic.findUnique({
        where: { id: input.id },
        include: {
          user: true,
          task: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
      if (!epic) return null;

      return {
        epic,
        author: epic.user,
        tasks: epic.task,
      };
    }),
  epics: publicProcedure.query(({ ctx }) => ctx.prisma.epic.findMany()),
  user: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });
      if (!user) return null;

      return user;
    }),
  task: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input.id },
        include: {
          epic: true,
        },
      });
      if (!task) return null;

      return {
        task,
        epic: task.epic,
      };
    }),
});
