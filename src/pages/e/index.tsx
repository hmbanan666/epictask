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
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';
import { api } from '../../utils/api';

const EpicsPage = () => {
  const { classes } = globalStyles();

  const { data: epics } = api.epic.findMany.useQuery();

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
};

export default EpicsPage;
