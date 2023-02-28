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
import { globalStyles } from '../../utils/styles';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const TaskPage = () => {
  const { classes } = globalStyles();
  const { query } = useRouter();
  const id = query.id as string;

  return (
    <>
      <Head>
        <title>Начнем же | Задача в Эпике #{id}</title>
      </Head>

      <Header />
      <Container style={{ marginBottom: 60 }}>
        <Title order={1} style={{ marginBottom: 20 }}>
          Начнем же
        </Title>

        <Grid>
          <Grid.Col md={8}>
            <Box style={{ marginBottom: 40 }}>
              <p>
                Создал репозиторий, собрал первые страницы на Next.js, добавил
                визуальную часть с помощью Mantine, собрал все в Docker
                контейнер.
              </p>

              <p>
                Начало такое же, как и у обычного проекта. Создать репозиторий
                на GitHub – легко. Для этого продукта я решил использовать
                проверенный ранее стек:
              </p>
              <ul>
                <li>
                  <b>TypeScript</b> – На чистом JS сейчас писать никому не
                  рекомендую, учитесь сразу все типизировать.
                </li>
                <li>
                  <b>Next.js</b> – Чтобы была возможность добавить обработку
                  данных на серверной стороне.
                </li>
                <li>
                  <b>tRPC</b> – Простой способ типизировать данные и быстро
                  развернуть API.
                </li>
                <li>
                  <b>NextAuth</b> – Простое решение для будущей аутентификации
                  пользователей на сайте (через GitHub, например).
                </li>
                <li>
                  <b>Mantine</b> – Готовые красивые компоненты для React.
                </li>
                <li>
                  <b>Docker</b> – Ну а как иначе это потом все запускать на
                  сервере?
                </li>
              </ul>
              <p>Базы данных пока нет. </p>

              <h2>Разворачиваем проект, устанавливаем пакеты</h2>
              <p>
                Вместо того, чтобы разворачивать Next.js с нуля, воспользуемся
                крутым решением T3 Stack 🔥
              </p>
              <pre>npm create t3-app@latest</pre>
              <p>
                После этого в проекте будет готовый стартовый шаблон, с tRPC
                (его будем настраивать в следующих задачах) и NextAuth
                (провайдер уже в _app.tsx и есть кастомные код для сессий).
                Дальше проходим и меняем все под себя: переменные окружения
                (env), в конфиге next.config обязательно:
              </p>
              <pre>output: &quot;standalone&quot;</pre>

              <h2>Визуальная часть</h2>
              <p>
                Создаю страницы, добавляю компоненты. Теперь добавляем
                визуальную часть. Для этого я решил использовать Mantine ❤️ У
                них отличный сайт с документацией и примерами. Писать свои
                компоненты с нуля – ну это сильно. Да, можно было бы
                использовать Tailwind, делать сразу &quot;все по уму&quot;.
              </p>
              <p>
                <b>
                  Совет: Если вы делаете проект с нуля, не тратьте время –
                  используйте все готовое. Потом, если стрельнет проект, можно
                  будет все переписать и сделать под себя на 100%. Время – это
                  деньги.
                </b>
              </p>
              <pre>
                npm install @mantine/core @mantine/hooks @mantine/next
                @emotion/server @emotion/react
              </pre>
              <p>
                Согласно документации, оборачиваю в _app.tsx Component в
                MantineProvider, добавляю файл с globalStyles (который потом
                можно использовать в любом компоненте).
              </p>

              <p>
                Создал &quot;на коленке&quot; логотип в Figma, сгенерировал все
                необходимые favicon и png файлы. Добавил их в проект. Создал
                _document.tsx и указал все пути к этим файлам. Не забываем и про
                site.webmanifest.
              </p>

              <h2>Docker и сборка</h2>
              <p>Создаю Dockerfile. Тут какие важные моменты:</p>
              <ul>
                <li>Используем последнюю версию ноды node:18-alpine</li>
                <li>
                  Делим на 3 уровня: deps для загрузки node_modules, builder для
                  сборки проекта, runner который уже будет запускать результат.
                  На каждом уровне копируем необходимые файлы. Это нужно для
                  кеширования, чтобы Docker постоянно не повторял одни и те же
                  действия.
                </li>
              </ul>
              <p>
                Как и обычно, тут совершенству нет предела. Можно кучу времени
                убить на донастройку.
              </p>
              <p>
                Для сборки использую бесплатную версию GitHub Actions. Нужно
                сделать простой YAML файл, указать все необходимые переменные в
                настройках репозитория, в разделе Secrets. Простые docker build
                и push в Container Registry (у меня он свой, приватный). По
                итогу при каждом коммите в main ветку, проект будет собираться и
                публиковаться в Container Registry с меткой latest.
              </p>

              <h2>Что еще?</h2>
              <p>
                Prettier, ESLint. Настройки базовые, но уже лучше, чем ничего.
                Опять же, тут совершенству нет предела.
              </p>
              <p>
                БД потом. Все материалы на сайте – пока хардкод. Сейчас важно
                собрать MVP, потом уже можно будет дорабатывать.
              </p>
              <p>
                .gitignore – тоже не забываем. Также про то, что секреты в код
                не заносим. В репозитории не должно быть приватных данных или
                доступов к серверу.
              </p>
              <p>README.md – все что в голову пришло, то и написал.</p>

              <p>Спасибо за внимание!</p>
            </Box>
          </Grid.Col>

          <Grid.Col md={4}>
            <Card p="lg" className={classes.coolCard}>
              <Title order={3} style={{ marginBottom: 10 }}>
                Задача #{id}
              </Title>
              <List listStyleType="none" spacing={10}>
                <List.Item>
                  <b>В Эпике:</b>{' '}
                  <div>
                    <Link href="/e/1">
                      <UnstyledButton className={classes.coolButton}>
                        <Group spacing={8}>
                          <ThemeIcon
                            color="violet"
                            radius="xl"
                            size="md"
                            variant="light"
                          >
                            <IconChecklist size={20} />
                          </ThemeIcon>
                          <Text>Платформа для разработчиков</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>
                  </div>
                </List.Item>
                <List.Item>
                  <b>Создана:</b> 27 февраля 2023 года
                </List.Item>
                <List.Item>
                  <b>Выполнена:</b> 28 февраля 2023 года
                </List.Item>
                <List.Item>
                  <b>Исполнители:</b>{' '}
                  <div>
                    <Link href="/u/hmbanan666">
                      <UnstyledButton className={classes.coolButton}>
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
                  <b>Опыт:</b> TypeScript, React, Next.js, Docker, tRPC, Node.js
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
