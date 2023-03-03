import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  Text,
  ThemeIcon,
  Timeline,
  Title,
  UnstyledButton,
} from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import {
  IconArrowBackUp,
  IconBrandGithub,
  IconCheck,
  IconDeviceFloppy,
  IconEdit,
  IconExternalLink,
  IconFileArrowRight,
  IconHourglassHigh,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { type Epic } from '@prisma/client';
import { showNotification, updateNotification } from '@mantine/notifications';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';
import { api } from '../../utils/api';
import TextEditor from '../../components/TextEditor';
import { CoolTimeAgo } from '../../components/CoolTimeAgo';

const EditingEpicBlock = ({
  epic,
  isSaving,
  dataRefetch,
  setIsSaving,
  setIsEditing,
}: {
  epic: Epic;
  isSaving: boolean;
  dataRefetch: () => unknown;
  setIsSaving: (value: boolean) => void;
  setIsEditing: (value: boolean) => void;
}) => {
  const { classes } = globalStyles();

  const [title, setTitle] = useState<string>(epic?.title);
  const [description, setDescription] = useState<string>(epic?.description);
  const [text, setText] = useState<string>(epic?.text || '');
  const [solvesProblem, setSolvesProblem] = useState<string>(
    epic?.solvesProblem || ''
  );

  const epicMutation = api.epic.update.useMutation({
    onSuccess: () => {
      dataRefetch();
      updateNotification({
        id: 'update-epic',
        color: 'teal',
        title: 'Эпик успешно обновлен!',
        message: 'Все хорошо. Сейчас обновим данные на странице',
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      });
    },
  });

  useEffect(() => {
    if (!isSaving || !epic?.id) return;

    showNotification({
      id: 'update-epic',
      loading: true,
      title: 'Обновляем Эпик...',
      message: 'Данные побежали на сервер, база зашуршала',
      color: 'blue',
      autoClose: false,
      disallowClose: true,
    });

    epicMutation.mutate({
      id: epic.id,
      title,
      description,
      text,
      solvesProblem,
    });
    setIsSaving(false);
    setIsEditing(false);
  }, [isSaving]);

  return (
    <>
      <Box style={{ marginBottom: 40 }}>
        <Text className={classes.coolTextEditorBlockTitle}>Заголовок:</Text>
        <TextEditor
          textOnly
          htmlContent={title}
          onUpdate={(value) => setTitle(value || '')}
        />

        <Text className={classes.coolTextEditorBlockTitle}>
          Короткое описание:
        </Text>
        <TextEditor
          textOnly
          htmlContent={description}
          onUpdate={(value) => setDescription(value || '')}
        />

        <Text className={classes.coolTextEditorBlockTitle}>
          Какие проблемы решает?
        </Text>
        <TextEditor
          htmlContent={solvesProblem}
          onUpdate={(value) => setSolvesProblem(value || '')}
        />

        <Text className={classes.coolTextEditorBlockTitle}>Текст:</Text>
        <TextEditor
          htmlContent={text}
          onUpdate={(value) => setText(value || '')}
        />
      </Box>
    </>
  );
};

const EpicPage: NextPage = () => {
  const { classes } = globalStyles();
  const { query } = useRouter();
  const id = query.id as string;

  const { data: session } = useSession();

  const { data: epicData, refetch: epicDataRefetch } = api.epic.id.useQuery({
    id,
  });

  const epic = epicData?.epic;
  const author = epicData?.author;
  const tasks = epicData?.tasks;

  const tasksInProgress = tasks?.filter((task) => !task?.completedAt);
  const completedTasks = tasks?.filter((task) => task?.completedAt);

  const isAuthor = session?.user?.id === author?.id;
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const AuthorEpicBlock = () => {
    const handleClickStartEditing = () => {
      setIsEditing((prev) => !prev);
    };

    const handleClickStopEditing = () => {
      setIsEditing((prev) => !prev);
    };

    const handleClickStopEditingAndSave = () => {
      setIsSaving(true);
    };

    return (
      <Card className={classes.coolCard} mb={40}>
        <Title order={3}>Вы автор этого Эпика</Title>
        <Text>Выберите необходимое действие. Может пару новых строк?</Text>

        <Group mt={20}>
          {isEditing ? (
            <>
              <Button
                className={classes.commonButton}
                onClick={handleClickStopEditingAndSave}
                leftIcon={<IconDeviceFloppy size={20} />}
              >
                Закончить редактирование
              </Button>
              <Button
                className={classes.rareButton}
                onClick={handleClickStopEditing}
                leftIcon={<IconArrowBackUp size={20} />}
              >
                Отменить
              </Button>
            </>
          ) : (
            <Button
              className={classes.rareButton}
              onClick={handleClickStartEditing}
              leftIcon={<IconEdit size={20} />}
            >
              Начать редактирование
            </Button>
          )}
        </Group>
      </Card>
    );
  };

  if (!epic) return null;

  if (isEditing) {
    return (
      <Container className={classes.wrapper}>
        {isAuthor && <AuthorEpicBlock />}
        <EditingEpicBlock
          epic={epic}
          dataRefetch={epicDataRefetch}
          isSaving={isSaving}
          setIsSaving={setIsSaving}
          setIsEditing={setIsEditing}
        />
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>
          {epic.title} | Эпик {id}
        </title>
      </Head>

      <Container className={classes.wrapper}>
        {isAuthor && <AuthorEpicBlock />}

        <Title order={1} style={{ marginBottom: 20 }}>
          {epic.title}
        </Title>

        <Grid>
          <Grid.Col md={8}>
            <Box style={{ marginBottom: 40 }}>
              <div dangerouslySetInnerHTML={{ __html: epic.description }} />
            </Box>

            {epic?.solvesProblem && (
              <Box style={{ marginBottom: 40 }}>
                <h2>Какие проблемы решает?</h2>
                <div dangerouslySetInnerHTML={{ __html: epic.solvesProblem }} />
              </Box>
            )}

            {epic?.text && (
              <Box style={{ marginBottom: 40 }}>
                <div dangerouslySetInnerHTML={{ __html: epic.text }} />
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
                  <div>
                    <CoolTimeAgo date={epic?.createdAt} />
                  </div>
                </List.Item>
                <List.Item>
                  <b>Дедлайн:</b>
                  <div>
                    <CoolTimeAgo date={epic?.deadlineAt} />
                  </div>
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

        {tasksInProgress && tasksInProgress.length > 0 && (
          <>
            <Title order={2} style={{ marginTop: 20, marginBottom: 10 }}>
              Задачи в процессе
            </Title>
            <Box mt={25} mb={40}>
              <Timeline bulletSize={24}>
                {tasksInProgress?.map((task) => (
                  <Timeline.Item
                    key={task.id}
                    title={task.title}
                    bullet={<IconHourglassHigh size={14} />}
                  >
                    <Text color="dimmed" size="xs" mt={4}>
                      <CoolTimeAgo date={task.createdAt} />
                    </Text>
                    <Text color="dimmed" size={15} mb={8}>
                      {task.description}
                    </Text>

                    <Link
                      href={`/t/${task.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        className={classes.rareButton}
                        leftIcon={<IconFileArrowRight size={20} />}
                      >
                        Открыть
                      </Button>
                    </Link>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Box>
          </>
        )}

        {completedTasks && completedTasks.length > 0 && (
          <>
            <Title order={2} style={{ marginTop: 20, marginBottom: 10 }}>
              Выполненные Задачи
            </Title>
            <Box mt={25} mb={40}>
              <Timeline bulletSize={24}>
                {completedTasks?.map((task) => (
                  <Timeline.Item
                    key={task.id}
                    title={task.title}
                    bullet={<IconCheck size={14} />}
                  >
                    <Text color="dimmed" size="xs" mt={4}>
                      <CoolTimeAgo date={task.completedAt} />
                    </Text>
                    <Text color="dimmed" size={15} mb={8}>
                      {task.description}
                    </Text>

                    <Link
                      href={`/t/${task.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        className={classes.commonButton}
                        leftIcon={<IconFileArrowRight size={20} />}
                      >
                        Открыть
                      </Button>
                    </Link>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Box>
          </>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default EpicPage;
