import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

const FIRST_EPIC_ID = 'yjwd7pbd5ycuqlge8x0lds82';
const FIRST_USER_ID = 'clepkr7240001lrbxb7fz2r4b';

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // TODO: Временный блок на создание задач
      const authorId = ctx.session.user.id;
      if (authorId !== FIRST_USER_ID) throw new Error('Временно недоступно');

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
  updateData: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        deadlineAt: z.date().nullable().optional(),
        isCompleted: z.boolean().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      const authorId = ctx.session.user.id;

      if (input.isCompleted) {
        return ctx.prisma.task.updateMany({
          where: { id: input.id, authorId },
          data: {
            completedAt: new Date(),
          },
        });
      }

      return ctx.prisma.task.updateMany({
        where: { id: input.id, authorId },
        data: {
          deadlineAt: input.deadlineAt,
        },
      });
    }),
  analyzeText: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input.id },
      });
      if (!task || !task.text) return null;

      // Remove all html tags
      const cleanText = task.text.replace(/(<([^>]+)>)/gi, '');
      // Prepare text
      const text = cleanText.toLowerCase();
      // Prepare array with used words in text
      const words = text.split(' ');

      const experiences = await ctx.prisma.experience.findMany();

      // Find all available experiences
      const experiencesExistInText = experiences.filter((experience) =>
        experience.aliases.some((alias) => text.includes(alias))
      );

      // Count how many times experience is used
      const experiencesCounted = {
        ...Object.fromEntries(
          experiencesExistInText.map((experience) => [experience.title, 0])
        ),
      };
      const experiencesExist = experiencesExistInText.map((experience) => {
        // if one of aliases is used, count it
        let count = 0;
        words.forEach((word) => {
          if (experience.aliases.some((alias) => word.includes(alias))) {
            count += 1;
          }
        });

        experiencesCounted[experience.title] = count;

        return { [experience.title]: count };
      });

      // TOP-5 by count
      const top5 = Object.fromEntries(
        Object.entries(experiencesCounted)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
      );

      // Get all counters and prepare percents for each experience
      const total = Object.values(top5).reduce((acc, cur) => acc + cur, 0);
      const experiencesInPercents = Object.fromEntries(
        Object.entries(top5).map(([key, value]) => [
          key,
          Math.round((value / total) * 100),
        ])
      );

      // Prepare array with objects, sort by value
      const experiencesWithPercents = Object.entries(experiencesInPercents).map(
        ([key, value]) => {
          const color =
            experiences.find((experience) => experience.title === key)?.color ||
            '#000';

          return {
            title: key,
            value,
            color,
          };
        }
      );

      return {
        experiencesExistInText,
        experiencesExist,
        experiencesCounted,
        experiencesInPercents,
        experiencesWithPercents,
      };
    }),
});
