import { useRouter } from 'next/router';
import Head from 'next/head';
import { Avatar, Card, Container, Grid, List, Title } from '@mantine/core';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';
import { api } from '../../utils/api';
import { localTime } from '../../utils/date';

const UserProfilePage = () => {
  const { classes } = globalStyles();
  const { query } = useRouter();
  const id = query.id as string;

  const { data: user } = api.data.user.useQuery({ username: id });

  if (!user) return null;

  return (
    <>
      <Head>
        <title>
          {user?.name} {user?.surname} | Профиль специалиста на Эпике @{id}
        </title>
      </Head>

      <Header />
      <Container style={{ marginBottom: 60 }}>
        <Title order={1} style={{ marginBottom: 20 }}>
          {user?.name} {user?.surname}
        </Title>

        <Grid>
          <Grid.Col md={4}>
            <Card p="lg" className={classes.coolCard}>
              <Avatar
                src="https://avatar.o5system.net/api/f3a0d471-af9c-4716-9e30-98720b612e02.svg?gender=male&emotion=7&size=140"
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
};

export default UserProfilePage;
