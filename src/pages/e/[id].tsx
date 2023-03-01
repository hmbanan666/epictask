import { type NextPage } from 'next';
import { useRouter } from 'next/router';
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
import Head from 'next/head';
import Link from 'next/link';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { marked } from 'marked';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';
import { api } from '../../utils/api';
import { localTime } from '../../utils/date';

const EpicPage: NextPage = () => {
  const { classes } = globalStyles();
  const { query } = useRouter();
  const id = query.id as string;

  const { data: epicData } = api.data.epic.useQuery({ id });

  const epic = epicData?.epic;
  const author = epicData?.author;
  const tasks = epicData?.tasks;

  const parsedDescription = marked.parse(epic?.description || '');
  const parsedSolvesProblem = marked.parse(epic?.solvesProblem || '');
  const parsedText = marked.parse(epic?.text || '');

  if (!epic) return null;

  return (
    <>
      <Head>
        <title>Платформа для разработчиков | Эпик {id}</title>
      </Head>

      <Container className={classes.wrapper}>
        <Title order={1} style={{ marginBottom: 20 }}>
          Платформа для разработчиков
        </Title>

        <Grid>
          <Grid.Col md={8}>
            <Box style={{ marginBottom: 40 }}>
              <div dangerouslySetInnerHTML={{ __html: parsedDescription }} />
            </Box>

            {parsedSolvesProblem && (
              <Box style={{ marginBottom: 40 }}>
                <h2>Какие проблемы решает?</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: parsedSolvesProblem }}
                />
              </Box>
            )}

            {parsedText && (
              <Box style={{ marginBottom: 40 }}>
                <div dangerouslySetInnerHTML={{ __html: parsedText }} />
              </Box>
            )}
          </Grid.Col>
          <Grid.Col md={4}>
            <Card p="lg" className={classes.coolCard}>
              <Title order={3}>Эпик</Title>
              <Text mb={10}>{id}</Text>

              <List listStyleType="none" spacing={14}>
                <List.Item>
                  <b>Создан:</b>
                  <div>{localTime(epic?.createdAt, true)}</div>
                </List.Item>
                <List.Item>
                  <b>Дедлайн:</b>
                  <div>{localTime(epic?.deadlineAt, true)}</div>
                </List.Item>
                <List.Item>
                  <b>Платформа:</b>
                  <div>{epic?.platform}</div>
                </List.Item>
                <List.Item>
                  <b>Бюджет:</b>
                  <div>{epic?.budget}</div>
                </List.Item>

                {author?.username && (
                  <List.Item>
                    <b>Автор:</b>{' '}
                    <div>
                      <Link href={`/u/${author?.username}`}>
                        <UnstyledButton className={classes.epicButton}>
                          <Group spacing={8}>
                            <Avatar src={author?.image} size="sm" radius="xl" />
                            <Text>
                              {author?.name} {author?.surname}
                            </Text>
                          </Group>
                        </UnstyledButton>
                      </Link>
                    </div>
                  </List.Item>
                )}

                {epic?.repositoryUrl && (
                  <List.Item>
                    <b>Репозиторий:</b>{' '}
                    <div>
                      <Link href={epic.repositoryUrl} target="_blank">
                        <UnstyledButton className={classes.epicButton}>
                          <Group spacing={8}>
                            <ThemeIcon
                              color="violet"
                              radius="xl"
                              size="md"
                              variant="light"
                            >
                              <IconBrandGithub size={20} />
                            </ThemeIcon>
                            <Text>GitHub</Text>
                          </Group>
                        </UnstyledButton>
                      </Link>
                    </div>
                  </List.Item>
                )}

                {epic?.websiteUrl && (
                  <List.Item>
                    <b>Веб-сайт:</b>{' '}
                    <div>
                      <Link href={epic?.websiteUrl} target="_blank">
                        <UnstyledButton className={classes.epicButton}>
                          <Group spacing={8}>
                            <ThemeIcon
                              color="violet"
                              radius="xl"
                              size="md"
                              variant="light"
                            >
                              <IconExternalLink size={20} />
                            </ThemeIcon>
                            <Text>{epic?.websiteUrl}</Text>
                          </Group>
                        </UnstyledButton>
                      </Link>
                    </div>
                  </List.Item>
                )}
              </List>
            </Card>
          </Grid.Col>
        </Grid>

        <Title order={2} style={{ marginTop: 20, marginBottom: 10 }}>
          Выполненные Задачи
        </Title>
        <Grid>
          {tasks?.map((task) => (
            <Grid.Col key={task.id} md={6}>
              <Card p="lg" className={classes.coolCard}>
                <Group position="apart" mt="xs" mb="xs">
                  <Text weight={500}>{task.title}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                  {task.description}
                </Text>

                <Box mt={20}>
                  <Link
                    href={`/t/${task.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <UnstyledButton
                      className={classes.commonButton}
                      style={{ minWidth: '100%', textAlign: 'center' }}
                    >
                      Открыть эту Задачу
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

export default EpicPage;
