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
  Title,
  UnstyledButton,
} from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { type Epic } from '@prisma/client';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';
import { api } from '../../utils/api';
import { localTime } from '../../utils/date';
import TextEditor from '../../components/TextEditor';

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
    onSuccess: () => dataRefetch(),
  });

  // If we need to save data
  useEffect(() => {
    if (isSaving && epic?.id) {
      epicMutation.mutate({
        id: epic.id,
        title,
        description,
        text,
        solvesProblem,
      });
      setIsSaving(false);
      setIsEditing(false);
    }
  }, [isSaving]);

  return (
    <>
      <Box style={{ marginBottom: 40 }}>
        <Text className={classes.coolTextEditorBlockTitle}>
          Заголовок Эпика:
        </Text>
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
              >
                Закончить редактирование
              </Button>
              <Button
                className={classes.rareButton}
                onClick={handleClickStopEditing}
              >
                Отменить
              </Button>
            </>
          ) : (
            <Button
              className={classes.rareButton}
              onClick={handleClickStartEditing}
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
