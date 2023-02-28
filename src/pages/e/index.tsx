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
import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';

const EpicCard = () => {
  const { classes } = globalStyles();

  return (
    <Card p="lg" className={classes.coolCard}>
      <Group position="apart" mt="xs" mb="xs">
        <Text weight={500}>Платформа для разработчиков</Text>
        <Badge color="orange" variant="light">
          Идет разработка
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        Я устал от раскиданной повсюду информации, хочу собрать все в одном
        месте. Что-то вроде своего блога, но более публичного.
      </Text>

      <Box mt={20}>
        <Link href="/e/1" style={{ textDecoration: 'none' }}>
          <UnstyledButton
            className={classes.coolButton}
            style={{ minWidth: '100%', textAlign: 'center' }}
          >
            Открыть Эпик #1
          </UnstyledButton>
        </Link>
      </Box>
    </Card>
  );
};

const EpicsPage = () => (
  <>
    <Header />
    <Container style={{ marginBottom: 60 }}>
      <Title order={1} style={{ marginBottom: 20 }}>
        Новые Эпики
      </Title>

      <Grid>
        <Grid.Col sm={6}>
          <EpicCard />
        </Grid.Col>
      </Grid>
    </Container>
    <Footer />
  </>
);

export default EpicsPage;
