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
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from 'next';
import { type Epic } from '.prisma/client';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';
import { prisma } from '../../server/db';

export const getServerSideProps: GetServerSideProps<{
  epics: Epic[];
}> = async () => {
  const epics = await prisma.epic.findMany();

  return {
    props: {
      epics,
    },
  };
};

export default function EpicsPage({
  epics,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { classes } = globalStyles();

  return (
    <>
      <Container className={classes.wrapper}>
        <Title order={1} style={{ marginBottom: 20 }}>
          Новые Эпики
        </Title>

        <Grid>
          {epics?.map((epic) => (
            <Grid.Col key={epic.id} sm={6}>
              <Card p="lg" className={classes.coolCard}>
                <Group position="apart" mt="xs" mb="xs">
                  <Text weight={500}>{epic?.title}</Text>
                  <Badge color="orange" variant="light">
                    Идет разработка
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                  {epic?.description}
                </Text>

                <Box mt={20}>
                  <Link
                    href={`/e/${epic?.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <UnstyledButton
                      className={classes.epicButton}
                      style={{ minWidth: '100%', textAlign: 'center' }}
                    >
                      Открыть этот Эпик
                    </UnstyledButton>
                  </Link>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
