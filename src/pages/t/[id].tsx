import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  Progress,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from '@mantine/core';
import Link from 'next/link';
import {
  IconArrowBackUp,
  IconCheck,
  IconChecklist,
  IconCircleFilled,
  IconDeviceFloppy,
  IconEdit,
  IconEye,
  IconSettings,
  IconThumbUp,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { type Epic, type Task, type User } from '@prisma/client';
import { notifications } from '@mantine/notifications';
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from 'next';
import Image from 'next/image';
import { globalStyles } from '../../utils/styles';
import { Footer } from '../../components/Footer';
import { api } from '../../utils/api';
import TextEditor from '../../components/TextEditor';
import { CoolTimeAgo } from '../../components/CoolTimeAgo';
import { CoolModal } from '../../components/CoolModal';
import { CoolDatePicker } from '../../components/CoolDatePicker';
import { prisma } from '../../server/db';
import { getServerAuthSession } from '../../server/auth';
import { russianWordEnding } from '../../utils/helpers';

export const getServerSideProps: GetServerSideProps<{
  task: Task;
  epic: Epic;
  author: User;
  isAuthor: boolean;
}> = async ({ params, req, res }) => {
  const taskId = params?.id as string;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      epic: true,
      user: true,
    },
  });

  if (!task) {
    return {
      notFound: true,
    };
  }

  const { epic, user: author } = task;

  const session = await getServerAuthSession({ req, res });
  const isAuthor = session?.user?.id === author?.id;

  // Add +1 view
  await prisma.task.update({
    where: { id: taskId },
    data: { views: { increment: 1 } },
  });

  return {
    props: {
      task,
      epic,
      author,
      isAuthor,
    },
  };
};

const TextAnalysisBlock = ({ id }: { id: string }) => {
  const { data } = api.task.analyzeText.useQuery({ id });

  const sections = data?.experiencesWithPercents;

  return (
    <div>
      <Progress radius="xl" size={6} sections={sections} />

      <Group mt={12} spacing={6}>
        {sections?.map((section) => {
          const count = data?.experiencesCounted[section.title];

          return (
            <UnstyledButton key={section.title} mr={10}>
              <Group spacing={6} align="baseline">
                <IconCircleFilled
                  size={8}
                  style={{ color: section.color, verticalAlign: 'top' }}
                />
                <Text size={16}>{section.title}</Text>
                <Text size={10} color="gray">
                  x{count}
                </Text>
                <Text size={10} color="gray">
                  {section.value}%
                </Text>
              </Group>
            </UnstyledButton>
          );
        })}
      </Group>
    </div>
  );
};

const EditingTaskBlock = ({
  task,
  isSaving,
  setIsSaving,
  setIsEditing,
}: {
  task: Task;
  isSaving: boolean;
  setIsSaving: (value: boolean) => void;
  setIsEditing: (value: boolean) => void;
}) => {
  const { classes } = globalStyles();

  const [title, setTitle] = useState<string>(task?.title);
  const [description, setDescription] = useState<string>(task?.description);
  const [text, setText] = useState<string>(task?.text || '');

  const taskMutation = api.task.update.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      notifications.update({
        id: 'update-task',
        color: 'green',
        title: 'Задача успешно обновлена!',
        message: 'Все хорошо. Сейчас обновим данные на странице',
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      });
      // refresh page
      window.location.reload();
    },
  });

  useEffect(() => {
    if (!isSaving || !task?.id) return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    notifications.show({
      id: 'update-task',
      loading: true,
      title: 'Обновляем Задачу...',
      message: 'Данные побежали на сервер, база зашуршала',
      color: 'blue',
      autoClose: false,
      withCloseButton: false,
    });

    taskMutation.mutate({
      id: task.id,
      title,
      description,
      text,
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

        <Text className={classes.coolTextEditorBlockTitle}>Текст:</Text>
        <TextEditor
          wordsCount
          htmlContent={text}
          onUpdate={(value) => setText(value || '')}
        />
      </Box>
    </>
  );
};

export default function TaskPage({
  task,
  epic,
  author,
  isAuthor,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { classes } = globalStyles();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isEditingData, setIsEditingData] = useState(false);
  const [deadlineAt, setDeadlineAt] = useState<Date | null>(
    task?.deadlineAt || null
  );

  const taskDataMutation = api.task.updateData.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      notifications.update({
        id: 'update-task-data',
        color: 'green',
        title: 'Задача успешно обновлена!',
        message: 'Все хорошо. Сейчас обновим данные на странице',
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      });
      // refresh page
      window.location.reload();
    },
  });

  const handleClickSaveData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    notifications.show({
      id: 'update-task-data',
      loading: true,
      title: 'Обновляем данные Задачи...',
      message: 'Данные побежали на сервер, база зашуршала',
      color: 'blue',
      autoClose: false,
      withCloseButton: false,
    });

    setIsEditingData(false);
    taskDataMutation.mutate({ id: task.id, deadlineAt });
  };

  const handleClickMarkTaskCompleted = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    notifications.show({
      id: 'update-task-data',
      loading: true,
      title: 'Обновляем данные Задачи...',
      message: 'Данные побежали на сервер, база зашуршала',
      color: 'blue',
      autoClose: false,
      withCloseButton: false,
    });

    setIsEditingData(false);
    taskDataMutation.mutate({ id: task.id, isCompleted: true });
  };

  const AuthorTaskBlock = () => {
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
        <Title order={3}>Вы автор этой Задачи</Title>
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
              Редактировать текст
            </Button>
          )}
        </Group>
      </Card>
    );
  };

  const handleClickLikeButton = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    notifications.show({
      title: 'Спасибо за ваш Лайк!',
      message: 'Он пока не поставился. Скоро будет реализация этой фичи.',
      withCloseButton: false,
    });
  };

  if (isEditing) {
    return (
      <Container className={classes.wrapper}>
        {isAuthor && <AuthorTaskBlock />}
        <EditingTaskBlock
          task={task}
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
          {task.title} | Задача в Эпике &quot;{epic.title}&quot;
        </title>
        <meta name="description" content={task.description} />
      </Head>

      <Container className={classes.wrapper}>
        {isAuthor && <AuthorTaskBlock />}

        <Title order={1} style={{ marginBottom: 20 }}>
          {task.title}
        </Title>

        <Grid>
          <Grid.Col md={8}>
            {task.completedAt && (
              <Box style={{ marginBottom: 20 }}>
                <Group spacing={8}>
                  <Group spacing={7} className={classes.statInfoElement}>
                    <IconEye size={20} opacity={0.5} />
                    <Text>
                      {task.views}{' '}
                      {russianWordEnding(task.views as number, [
                        'просмотр',
                        'просмотра',
                        'просмотров',
                      ])}
                    </Text>
                  </Group>
                  {/*<Text className={classes.statInfoElement}>?? лайков</Text>*/}
                  {/*<Text className={classes.statInfoElement}>??? символов</Text>*/}
                </Group>
              </Box>
            )}

            <Box style={{ marginBottom: 40 }}>
              <p>{task.description}</p>

              <div dangerouslySetInnerHTML={{ __html: task?.text || '' }} />
            </Box>

            {task.completedAt && (
              <Box mb={40}>
                <Card p="lg" className={classes.coolCard}>
                  <Group spacing={15}>
                    <Image
                      src="/emoji/thumbs_up.gif"
                      width={80}
                      height={80}
                      alt=""
                    />
                    <Box>
                      <Title order={3}>Понравился материал?</Title>
                      <Text mb={12}>
                        Поставь лайк, чтобы автор получил Опыт!
                      </Text>

                      <Button
                        className={classes.likeButton}
                        leftIcon={<IconThumbUp />}
                        onClick={handleClickLikeButton}
                      >
                        Ставлю лайк!
                      </Button>
                    </Box>
                  </Group>
                </Card>
              </Box>
            )}
          </Grid.Col>

          <Grid.Col md={4}>
            <Card p="lg" className={classes.coolCard}>
              {isAuthor && (
                <Box mb={15}>
                  <Button
                    className={classes.rareButton}
                    onClick={() => setIsEditingData(true)}
                    leftIcon={<IconSettings size={20} />}
                  >
                    Редактировать данные
                  </Button>
                </Box>
              )}

              <Title order={3}>Задача</Title>
              <Text mb={10}>{task.id}</Text>

              <List listStyleType="none" spacing={14}>
                <List.Item>
                  <b>Создана:</b>
                  <div>
                    <CoolTimeAgo date={task.createdAt} />
                  </div>
                </List.Item>
                {task?.deadlineAt && !task?.completedAt && (
                  <List.Item>
                    <b>Дедлайн:</b>
                    <div>
                      <CoolTimeAgo date={task.deadlineAt} />
                    </div>
                  </List.Item>
                )}
                {task?.completedAt && (
                  <List.Item>
                    <b>Выполнена:</b>
                    <div>
                      <CoolTimeAgo date={task.completedAt} />
                    </div>
                  </List.Item>
                )}
                <List.Item>
                  <b>Часть Эпика:</b>{' '}
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
                          <Text align="left">{epic?.title}</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>
                  </div>
                </List.Item>
                {author?.username && (
                  <List.Item>
                    <b>Автор:</b>{' '}
                    <div>
                      <Link href={`/u/${author.username}`}>
                        <UnstyledButton className={classes.epicButton}>
                          <Group spacing={8}>
                            <Avatar
                              src={author?.image}
                              alt={`Аватар пользователя ${author.username}`}
                              size="sm"
                              radius="xl"
                            />
                            <Text>
                              {author?.name} {author?.surname}
                            </Text>
                          </Group>
                        </UnstyledButton>
                      </Link>
                    </div>
                  </List.Item>
                )}
                {task.id && task.completedAt && (
                  <List.Item>
                    <b>Опыт:</b>
                    <TextAnalysisBlock id={task.id} />
                  </List.Item>
                )}
              </List>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>

      <Footer />

      <CoolModal
        title="Данные задачи"
        opened={isEditingData}
        onClose={() => setIsEditingData(false)}
      >
        <form>
          <CoolDatePicker
            label="Дата дедлайна"
            value={deadlineAt}
            onChange={setDeadlineAt}
          />

          <Group>
            {!task?.completedAt && (
              <Button
                type="submit"
                onClick={(e) => handleClickMarkTaskCompleted(e)}
                className={classes.commonButton}
                leftIcon={<IconCheck size={20} />}
              >
                Задача выполнена!
              </Button>
            )}

            <Button
              type="submit"
              onClick={(e) => handleClickSaveData(e)}
              className={classes.commonButton}
              leftIcon={<IconDeviceFloppy size={20} />}
            >
              Сохранить данные
            </Button>
          </Group>
        </form>
      </CoolModal>
    </>
  );
}
