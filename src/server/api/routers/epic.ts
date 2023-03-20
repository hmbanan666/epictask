import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const epicRouter = createTRPCRouter({
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
