import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Avatar,
  Badge,
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
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { globalStyles } from '../../utils/styles';
import { api } from '../../utils/api';

const EpicPage: NextPage = () => {
  const { classes } = globalStyles();
  const { query } = useRouter();
  const id = query.id as string;

  const { data: tasks } = api.data.tasks.useQuery();

  return (
    <>
      <Head>
        <title>Платформа для разработчиков | Эпик #{id}</title>
      </Head>

      <Header />
      <Container style={{ marginBottom: 60 }}>
        <Title order={1} style={{ marginBottom: 20 }}>
          Платформа для разработчиков
        </Title>

        <Grid>
          <Grid.Col md={8}>
            <Box style={{ marginBottom: 40 }}>
              Место для разработчиков, где можно будет:
              <ul>
                <li>
                  <b>Создать и заполнить свой Профиль.</b> Укажи свой опыт,
                  контакты и соц сети, прикрепи все свои сертификаты, ссылку на
                  свой блог.
                </li>
                <li>
                  <b>Создать Эпик.</b> Это общий план по разработке продукта.
                  Бизнес задачи, идеи, планы, мотивация, цели, проблемы,
                  решения, технические детали, сроки, бюджет, команда,
                  результаты.
                </li>
                <li>
                  <b>Наполнять свои Эпики контентом.</b> Столкнулся с интересным
                  заданием? Поделись со всеми решением! В процессе ты получишь
                  Опыт и Трофеи.
                </li>
                <li>
                  <b>Следить за прогрессом других.</b> Подпишись на Эпики
                  разработчиков, на их профили.
                </li>
              </ul>
            </Box>

            <Box style={{ marginBottom: 40 }}>
              <Title order={2} style={{ marginBottom: 10 }}>
                Какие проблемы решает?
              </Title>
              <p>
                Прежде всего решает главную проблему разработчиков -
                &quot;раскиданная и размазанная&quot; информация.{' '}
                <b>Все в разных местах, на разных площадках.</b> Здесь все
                (вообще все необходимое) будет в одном месте.
              </p>
              <p>
                Вторая проблема:{' '}
                <b>специалист не может донести свой опыт до бизнеса</b> на
                собеседовании. Бизнес же не знает, подходит ли специалист для
                решения его задач.
              </p>
              <p>
                Третья проблема: <b>нет мотивации</b> 😔 для разработчиков
                тратить время на написание полезных статей. В моем понимании, то
                что происходит сейчас на контентных площадках и в соц сетях –
                это чушь собачья. Море хейта и воды. Компании ведут свои пустые
                блоги для привлечения внимания разработчиков, а разработчики
                пишут статьи для того чтобы &quot;светануться&quot;.
              </p>
              <p>Какую пользу и решения я вижу в этом продукте:</p>
              <ul>
                <li>
                  Тут есть мотивация для всех. Разработчик, ведешь проект?
                  Создай Эпик и наполняй его полезным контентом. Рассказывай
                  какие задачи решил, какие проблемы встретил, какой опыт
                  приобрел. Пользователи, которым понравился контент и Эпик,
                  делятся с тобой Печеньем и Пончиками. Так растет Опыт в
                  Профиле. Чем больше Опыта, тем ты интереснее на собеседовании.
                </li>
                <li>
                  Эй, бизнес! Тут максимально удобно приготовлена информация в
                  Профиле специалиста: кто он, что он умеет, насколько он
                  активен – без водяных придуманных текстов, чистые цифры и
                  теги. В этой скорости у тебя появляется мотивация спрашивать у
                  соискателя: &quot;А у вас есть профиль на Эпике?&quot; 🤔
                </li>
                <li>
                  Если проблему мотиваций двух сторон решили, то пустой контент
                  и не нужен будет. Наоборот, спрос будет на концентрированные
                  знания и опыт. Не нужно будет указывать кто ты, фронтендер или
                  бэкендер. Все данные уже в статьях, они имеют теги и веса.
                  Скрипты сами покажут в Профиле кто ты, на каких стеках
                  работаешь и какой опыт имеешь. Решили вторую проблему.
                </li>
                <li>
                  Ок, агрегируем все что можно. Ты прошел обучение в онлайн
                  школе и получил сертификат? Покажем его прямо в Профиле. Ты
                  пишешь статьи на хабре? Ок, прикрепляй их в Профиль. Читаешь?
                  Покажи что именно. Ты участвуешь в конференциях? Покажи
                  выступления.
                </li>
                <li>
                  Да, это не дает гарантий трудоустройства, но это будет жирным
                  плюсом, поверь. Когда нанимателю даешь все данные в
                  концентрированном виде и в одном месте – вот это уже экономит
                  кучу времени и дает результат.
                </li>
              </ul>
            </Box>

            <Box style={{ marginBottom: 40 }}>
              <Title order={2} style={{ marginBottom: 10 }}>
                Что-то еще?
              </Title>

              <p>
                Моя основная цель в этом продукте – собрать крутых спецов в
                одном месте. Можно будет создать Эпик, в пару кликов пригласить
                компетентных людей (на основе их Опыта) в команду. Пара
                сообщений в чате, созвон – и вот уже все знакомы. А там и до
                стартапа не далеко.
              </p>
              <p>
                Очень много денег и времени уходит именно на поиск и знакомство.
                Плюс люди не любят делиться правдой о себе. А сколько можно
                сэкономить, если все будет в одном месте и с прозрачной системой
                оценки?
              </p>
              <p>
                Если у нас будет такая скорость, то можно будет прыгать из
                проекта в проект проще, чем сейчас 🚀
              </p>
            </Box>
          </Grid.Col>
          <Grid.Col md={4}>
            <Card p="lg" className={classes.coolCard}>
              <Title order={3} style={{ marginBottom: 10 }}>
                Эпик #{id}
              </Title>
              <List listStyleType="none" spacing={10}>
                <List.Item>
                  <b>Создан:</b> 27 февраля 2023 года
                </List.Item>
                <List.Item>
                  <b>Дедлайн:</b> Конец 2023 года
                </List.Item>
                <List.Item>
                  <b>Платформа:</b> Веб
                </List.Item>
                <List.Item>
                  <b>Бюджет:</b> 2 бутерброда с колбасой
                </List.Item>
                <List.Item>
                  <b>Основатель:</b>{' '}
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
                  <b>Репозиторий:</b>{' '}
                  <div>
                    <Link
                      href="https://github.com/hmbanan666/epictask"
                      target="_blank"
                    >
                      <UnstyledButton className={classes.coolButton}>
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
                <List.Item>
                  <b>Веб-сайт:</b>{' '}
                  <div>
                    <Link href="https://epictask.online" target="_blank">
                      <UnstyledButton className={classes.coolButton}>
                        <Group spacing={8}>
                          <ThemeIcon
                            color="violet"
                            radius="xl"
                            size="md"
                            variant="light"
                          >
                            <IconExternalLink size={20} />
                          </ThemeIcon>
                          <Text>https://epictask.online</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>
                  </div>
                </List.Item>
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
                  <Badge color="orange" variant="light">
                    Задача #{task.id}
                  </Badge>
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
                      className={classes.coolButton}
                      style={{ minWidth: '100%', textAlign: 'center' }}
                    >
                      Открыть Задачу #{task.id}
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
