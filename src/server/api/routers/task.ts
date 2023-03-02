import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

const FIRST_EPIC_ID = 'yjwd7pbd5ycuqlge8x0lds82';

export const taskRouter = createTRPCRouter({
  id: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input.id },
        include: {
          epic: true,
          user: true,
        },
      });
      if (!task) return null;

      return {
        task,
        epic: task.epic,
        author: task.user,
      };
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const authorId = ctx.session.user.id;

      return ctx.prisma.task.create({
        data: {
          id: createId(),
          title: input.title,
          description: input.description,
          epicId: FIRST_EPIC_ID,
          authorId,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        text: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const authorId = ctx.session.user.id;

      return ctx.prisma.task.updateMany({
        where: { id: input.id, authorId },
        data: {
          title: input.title,
          description: input.description,
          text: input.text,
        },
      });
    }),
});
