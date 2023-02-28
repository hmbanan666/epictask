import { useRouter } from 'next/router';
import Head from 'next/head';
import { Avatar, Card, Container, Grid, List, Title } from '@mantine/core';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';

const UserProfilePage = () => {
  const { classes } = globalStyles();
  const { query } = useRouter();
  const id = query.id as string;

  return (
    <>
      <Head>
        <title>Николай Косарев | Профиль специалиста на Эпике @{id}</title>
      </Head>

      <Header />
      <Container style={{ marginBottom: 60 }}>
        <Title order={1} style={{ marginBottom: 20 }}>
          Николай Косарев
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
                  <b>Создан:</b> 27 февраля 2023 года
                </List.Item>
                <List.Item>
                  <b>Никнейм:</b> hmbanan666
                </List.Item>
                <List.Item>
                  <b>Блог:</b> https://kosarev.space
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
