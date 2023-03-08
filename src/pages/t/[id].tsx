import { useRouter } from 'next/router';
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
  IconSettings,
  IconThumbUp,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { type Task } from '@prisma/client';
import { showNotification, updateNotification } from '@mantine/notifications';
import { globalStyles } from '../../utils/styles';
import { Footer } from '../../components/Footer';
import { api } from '../../utils/api';
import TextEditor from '../../components/TextEditor';
import { CoolTimeAgo } from '../../components/CoolTimeAgo';
import { CoolModal } from '../../components/CoolModal';
import { CoolDatePicker } from '../../components/CoolDatePicker';

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
  dataRefetch,
  setIsSaving,
  setIsEditing,
}: {
  task: Task;
  isSaving: boolean;
  dataRefetch: () => unknown;
  setIsSaving: (value: boolean) => void;
  setIsEditing: (value: boolean) => void;
}) => {
  const { classes } = globalStyles();

  const [title, setTitle] = useState<string>(task?.title);
  const [description, setDescription] = useState<string>(task?.description);
  const [text, setText] = useState<string>(task?.text || '');

  const taskMutation = api.task.update.useMutation({
    onSuccess: () => {
      dataRefetch();
      updateNotification({
        id: 'update-task',
        color: 'green',
        title: 'Задача успешно обновлена!',
        message: 'Все хорошо. Сейчас обновим данные на странице',
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      });
    },
  });

  useEffect(() => {
    if (!isSaving || !task?.id) return;

    showNotification({
      id: 'update-task',
      loading: true,
      title: 'Обновляем Задачу...',
      message: 'Данные побежали на сервер, база зашуршала',
      color: 'blue',
      autoClose: false,
      disallowClose: true,
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
          htmlContent={text}
          onUpdate={(value) => setText(value || '')}
        />
      </Box>
    </>
  );
};

const TaskPage = () => {
  const { classes } = globalStyles();
  const router = useRouter();
  const id = router.query.id as string;

  const { data: session } = useSession();

  const { data: taskData, refetch: taskDataRefetch } = api.task.id.useQuery({
    id,
  });

  const task = taskData?.task;
  const epic = taskData?.epic;
  const author = taskData?.author;

  const isAuthor = session?.user?.id === task?.authorId;
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isEditingData, setIsEditingData] = useState(false);
  const [deadlineAt, setDeadlineAt] = useState<Date | null>(
    task?.deadlineAt || null
  );

  const taskDataMutation = api.task.updateData.useMutation({
    onSuccess: () => {
      void taskDataRefetch();
      updateNotification({
        id: 'update-task-data',
        color: 'green',
        title: 'Задача успешно обновлена!',
        message: 'Все хорошо. Сейчас обновим данные на странице',
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      });
    },
  });

  const handleClickSaveData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    showNotification({
      id: 'update-task-data',
      loading: true,
      title: 'Обновляем данные Задачи...',
      message: 'Данные побежали на сервер, база зашуршала',
      color: 'blue',
      autoClose: false,
      disallowClose: true,
    });

    setIsEditingData(false);
    taskDataMutation.mutate({ id, deadlineAt });
  };

  const handleClickMarkTaskCompleted = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    showNotification({
      id: 'update-task-data',
      loading: true,
      title: 'Обновляем данные Задачи...',
      message: 'Данные побежали на сервер, база зашуршала',
      color: 'blue',
      autoClose: false,
      disallowClose: true,
    });

    setIsEditingData(false);
    taskDataMutation.mutate({ id, isCompleted: true });
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

  if (!task) return null;

  if (isEditing) {
    return (
      <Container className={classes.wrapper}>
        {isAuthor && <AuthorTaskBlock />}
        <EditingTaskBlock
          task={task}
          dataRefetch={taskDataRefetch}
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
          {task.title} | Задача в Эпике &quot;{epic?.title}&quot;
        </title>
      </Head>

      <Container className={classes.wrapper}>
        {isAuthor && <AuthorTaskBlock />}

        <Title order={1} style={{ marginBottom: 20 }}>
          {task.title}
        </Title>

        <Grid>
          <Grid.Col md={8}>
            <Box style={{ marginBottom: 20 }}>
              <Group spacing={8}>
                <Text className={classes.statInfoElement}>?? лайков</Text>
                <Text className={classes.statInfoElement}>?? просмотров</Text>
                <Text className={classes.statInfoElement}>??? символов</Text>
              </Group>
            </Box>

            <Box style={{ marginBottom: 40 }}>
              <p>{task.description}</p>

              <div dangerouslySetInnerHTML={{ __html: task?.text || '' }} />
            </Box>

            <Box style={{ marginBottom: 40 }}>
              <Card p="xl" className={classes.coolCard}>
                <Title order={3}>Понравился материал?</Title>
                <Text mb={12}>Поставь лайк, чтобы автор получил Опыт!</Text>

                <Group spacing={8}>
                  <Button
                    className={classes.likeButton}
                    leftIcon={<IconThumbUp />}
                  >
                    Ставлю лайк!
                  </Button>
                </Group>
              </Card>
            </Box>
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
                          <Text>{epic?.title}</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>
                  </div>
                </List.Item>
                <List.Item>
                  <b>Автор:</b>{' '}
                  <div>
                    <Link href={`/u/${author?.username || ''}`}>
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
                <List.Item>
                  <b>Опыт:</b>
                  <TextAnalysisBlock id={task?.id} />
                </List.Item>
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
};

export default TaskPage;
