import React from 'react';
import { type NextPage } from 'next';
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Text,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { globalStyles } from '../utils/styles';

const EpicCard = () => {
  const { theme } = globalStyles();

  return (
    <Card
      p="lg"
      radius="md"
      withBorder
      style={{ borderColor: theme.colors.gray[1] }}
    >
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Платформа для разработчиков</Text>
        <Badge color="orange" variant="light">
          Идет разработка
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        Я устал от раскиданной повсюду информации, хочу собрать все в одном
        месте. Что-то вроде своего блога, но более публичного.
      </Text>

      <Link href="/e/1" style={{ textDecoration: 'none' }}>
        <Button variant="light" color="violet" fullWidth mt="md" radius="md">
          Открыть Эпик #1
        </Button>
      </Link>
    </Card>
  );
};

const HomePage: NextPage = () => (
  <>
    <Header />
    <Container style={{ marginBottom: 60 }}>
      <div>
        <Title order={1}>Epic Task</Title>
        <p>
          Онлайн площадка для разработчиков, на которой можно [будет, в течение
          2023 года]:
        </p>
        <ul>
          <li>
            <b>Создать и заполнить свой Профиль.</b> Укажи свой опыт, контакты и
            соц сети, прикрепи все свои сертификаты, ссылку на свой блог.
          </li>
          <li>
            <b>Создать Эпик.</b> Это общий план по разработке продукта. Бизнес
            задачи, идеи, планы, мотивация, цели, проблемы, решения, технические
            детали, сроки, бюджет, команда, результаты.
          </li>
          <li>
            <b>Наполнять свои Эпики контентом.</b> Столкнулся с интересным
            заданием? Поделись со всеми решением! В процессе ты получишь Опыт и
            Трофеи.
          </li>
          <li>
            <b>Следить за прогрессом других.</b> Подпишись на Эпики
            разработчиков, на их профили.
          </li>
        </ul>
      </div>

      <div style={{ marginTop: 80 }}>
        <Title order={2} mb={20}>
          Эпики
        </Title>
        <Grid>
          <Grid.Col sm={6}>
            <EpicCard />
          </Grid.Col>
        </Grid>
      </div>
    </Container>

    <Footer />
  </>
);

export default HomePage;
