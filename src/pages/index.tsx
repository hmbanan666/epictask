import React from 'react';
import {
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Group,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import Link from 'next/link';
import { type Epic } from '@prisma/client';
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from 'next';
import { Footer } from '../components/Footer';
import { globalStyles } from '../utils/styles';
import { prisma } from '../server/db';

export const getServerSideProps: GetServerSideProps<{
  epics: Epic[];
}> = async () => {
  const epics = await prisma.epic.findMany();

  return { props: { epics } };
};

export default function HomePage({
  epics,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { classes } = globalStyles();

  return (
    <>
      <Container className={classes.wrapper}>
        <div>
          <Title order={1}>Epic Task</Title>
          <p>
            Онлайн площадка для разработчиков, на которой можно [будет, в
            течение 2023 года]:
          </p>
          <ul>
            <li>
              <b>Создать и заполнить свой Профиль.</b> Укажи свой опыт, контакты
              и соц сети, прикрепи все свои сертификаты, ссылку на свой блог.
            </li>
            <li>
              <b>Создать Эпик.</b> Это общий план по разработке продукта. Бизнес
              задачи, идеи, планы, мотивация, цели, проблемы, решения,
              технические детали, сроки, бюджет, команда, результаты.
            </li>
            <li>
              <b>Наполнять свои Эпики контентом.</b> Столкнулся с интересным
              заданием? Поделись со всеми решением! В процессе ты получишь Опыт
              и Трофеи.
            </li>
            <li>
              <b>Следить за прогрессом других.</b> Подпишись на Эпики
              разработчиков, на их профили.
            </li>
          </ul>
        </div>

        <Box mt={80}>
          <Title order={2} mb={20}>
            Новые Эпики
          </Title>
          <Grid>
            {epics?.map((epic) => (
              <Grid.Col key={epic.id} sm={6}>
                <Card p="lg" className={classes.coolCard}>
                  <Group position="apart" mt="xs" mb="xs">
                    <Text weight={500}>{epic.title}</Text>
                    <Badge color="orange" variant="light">
                      Идет разработка
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    {epic?.description}
                  </Text>

                  <Box mt={20}>
                    <Link href={`/e/${epic.id}`}>
                      <UnstyledButton className={classes.epicButton} w="100%">
                        Открыть этот Эпик
                      </UnstyledButton>
                    </Link>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
