import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const epicRouter = createTRPCRouter({
  id: publicProcedure
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
  findMany: publicProcedure.query(({ ctx }) => ctx.prisma.epic.findMany()),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        text: z.string(),
        solvesProblem: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const authorId = ctx.session.user.id;

      return ctx.prisma.epic.updateMany({
        where: { id: input.id, authorId },
        data: {
          title: input.title,
          description: input.description,
          text: input.text,
          solvesProblem: input.solvesProblem,
        },
      });
    }),
});
