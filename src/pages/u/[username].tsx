import Head from 'next/head';
import { Avatar, Card, Container, Grid, List, Title } from '@mantine/core';
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from 'next';
import { type User } from '.prisma/client';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';
import { localTime } from '../../utils/date';
import { prisma } from '../../server/db';

export const getServerSideProps: GetServerSideProps<{ user: User }> = async ({
  params,
}) => {
  const username = params?.username as string;
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default function UserProfilePage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { classes } = globalStyles();

  return (
    <>
      <Head>
        <title>
          {user?.name} {user?.surname} | Профиль специалиста на Эпике @
          {user.username}
        </title>
      </Head>

      <Container className={classes.wrapper}>
        <Title order={1} style={{ marginBottom: 20 }}>
          {user?.name} {user?.surname}
        </Title>

        <Grid>
          <Grid.Col md={4}>
            <Card p="lg" className={classes.coolCard}>
              <Avatar
                src={user?.image}
                size={100}
                style={{ marginBottom: 20 }}
              />

              <List listStyleType="none">
                <List.Item>
                  <b>Создан:</b> {localTime(user?.createdAt)}
                </List.Item>
                <List.Item>
                  <b>Никнейм:</b> {user?.username}
                </List.Item>
                <List.Item>
                  <b>Блог:</b> -
                </List.Item>
              </List>
            </Card>
          </Grid.Col>
          <Grid.Col md={8}>
            <Card p="lg" className={classes.coolCard}>
              Тут пока пусто
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
