import { Center, Container, Title } from '@mantine/core';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Container>
      <Title align="center" size={40}>
        404
      </Title>
      <Title order={2} align="center">
        Страница не найдена
      </Title>

      <Center mt={30}>
        <Link href="/">Вернуться на главную</Link>
      </Center>
    </Container>
  );
}
