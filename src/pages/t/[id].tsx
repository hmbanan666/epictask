import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core';
import Link from 'next/link';
import { IconChecklist } from '@tabler/icons-react';
import { marked } from 'marked';
import { globalStyles } from '../../utils/styles';
import { Footer } from '../../components/Footer';
import { api } from '../../utils/api';
import { localTime } from '../../utils/date';

const TaskPage = () => {
  const { classes } = globalStyles();
  const { query } = useRouter();
  const id = query.id as string;

  const { data: taskData } = api.data.task.useQuery({ id });

  const task = taskData?.task;
  const epic = taskData?.epic;

  const parsedText = marked.parse(task?.text || '');

  if (!task) return null;

  return (
    <>
      <Head>
        <title>
          {task.title} | Задача в Эпике {task.epicId}
        </title>
      </Head>

      <Container className={classes.wrapper}>
        <Title order={1} style={{ marginBottom: 20 }}>
          {task.title}
        </Title>

        <Grid>
          <Grid.Col md={8}>
            <Box style={{ marginBottom: 40 }}>
              <p>{task.description}</p>

              <div dangerouslySetInnerHTML={{ __html: parsedText }} />
            </Box>
          </Grid.Col>

          <Grid.Col md={4}>
            <Card p="lg" className={classes.coolCard}>
              <Title order={3}>Задача</Title>
              <Text mb={10}>{task.id}</Text>

              <List listStyleType="none" spacing={14}>
                <List.Item>
                  <b>В Эпике:</b>{' '}
                  <div>
                    <Link href={`/e/${task.epicId}`}>
                      <UnstyledButton className={classes.epicButton}>
                        <Group spacing={8}>
                          <ThemeIcon
                            color="violet"
                            radius="xl"
                            size="md"
                            variant="light"
                          >
                            <IconChecklist size={20} />
                          </ThemeIcon>
                          <Text>{epic?.title}</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>
                  </div>
                </List.Item>
                <List.Item>
                  <b>Создана:</b>
                  <div>{localTime(task.createdAt, true)}</div>
                </List.Item>
                <List.Item>
                  <b>Выполнена:</b>
                  <div>{localTime(task.completedAt, true)}</div>
                </List.Item>
                <List.Item>
                  <b>Исполнители:</b>{' '}
                  <div>
                    <Link href="/u/hmbanan666">
                      <UnstyledButton className={classes.epicButton}>
                        <Group spacing={8}>
                          <Avatar
                            src="https://avatar.o5system.net/api/f3a0d471-af9c-4716-9e30-98720b612e02.svg?gender=male&emotion=7&size=140"
                            size="sm"
                            radius="xl"
                          />
                          <Text>Николай Косарев</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>
                  </div>
                </List.Item>
                <List.Item>
                  <b>Опыт:</b>
                  <div>TypeScript, React, Next.js, Docker, tRPC, Node.js</div>
                </List.Item>
              </List>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default TaskPage;
