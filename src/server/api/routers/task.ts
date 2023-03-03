import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

const FIRST_EPIC_ID = 'yjwd7pbd5ycuqlge8x0lds82';
const FIRST_USER_ID = 'clepkr7240001lrbxb7fz2r4b';

const EXPERIENCE_WITH_ALIASES = {
  typescript: ['typescript', '.tsx'],
  javascript: ['javascript', '.jsx'],
  react: ['react', 'reactjs', 'react.js'],
  nodejs: ['nodejs', 'node.js', 'node'],
  express: ['express', 'expressjs', 'express.js'],
  mongodb: ['mongodb', 'mongo', 'mongo.db'],
  mysql: ['mysql', 'my.sql'],
  postgresql: ['postgresql', 'postgres', 'postgre.sql'],
  redis: ['redis', 'redisdb', 'redis.db'],
  docker: ['docker', 'dockerfile', 'docker.com'],
  kubernetes: ['kubernetes', 'k8s', 'k8'],
  git: ['git', 'gitlab', 'github', 'gitignore'],
  html: ['html', 'html5'],
  css: ['css', 'css3'],
  sass: ['sass', 'sass.com'],
  less: ['less', 'less.com'],
  bootstrap: ['bootstrap', 'bootstrap.com'],
  trpc: ['trpc', 'trpc.com'],
  nextjs: ['nextjs', 'next.js', 'next'],
  nextauth: ['nextauth', 'nextauth.com'],
  prisma: ['prisma', 'prisma.com'],
  mantine: ['mantine', 'mantine.com'],
  figma: ['figma', 'figma.com'],
  yaml: ['yaml', 'yml'],
  eslint: ['eslint', 'eslint.com'],
  markdown: ['markdown', 'md'],
};

const EXPERIENCE_WITH_COLORS = {
  typescript: '#3178c6',
  javascript: '#F0DB4F',
  react: '#61DBFB',
  nodejs: '#68A063',
  express: '#444444',
  mongodb: '#419e39',
  mysql: '#02758f',
  postgresql: '#306793',
  redis: '#dc372c',
  docker: '#394e55',
  kubernetes: '#326ce5',
  git: '#F1502F',
  html: '#F06529',
  css: '#2965f1',
  sass: '#cf649a',
  less: '#1d365d',
  bootstrap: '#6e2bf2',
  trpc: '#398ccb',
  nextjs: '#000000',
  nextauth: '#20aef2',
  prisma: '#2d3748',
  mantine: '#339af0',
  figma: '#f24d1f',
  yaml: '#000000',
  eslint: '#4b32c3',
  markdown: '#000000',
};

type Experience = keyof typeof EXPERIENCE_WITH_ALIASES;

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

      // Find all available experiences
      const experiences = Object.keys(EXPERIENCE_WITH_ALIASES);

      const experiencesExistInText = experiences.filter((key) => {
        const typedKey = key as Experience;
        const aliases = EXPERIENCE_WITH_ALIASES[typedKey];

        return aliases.some((alias) => text.includes(alias));
      });

      // Count how many times experience is used
      const experiencesCounted = {
        ...Object.fromEntries(experiencesExistInText.map((key) => [key, 0])),
      };
      const experiencesExist = experiencesExistInText.map((key) => {
        const typedKey = key as Experience;
        const aliases = EXPERIENCE_WITH_ALIASES[typedKey];

        // if one of aliases is used, count it
        let count = 0;
        words.forEach((word) => {
          if (aliases.some((alias) => word.includes(alias))) count += 1;
        });

        experiencesCounted[typedKey] = count;

        return { [typedKey]: count };
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
        ([key, value]) => ({
          title: key,
          value,
          color: EXPERIENCE_WITH_COLORS[key as Experience],
        })
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
