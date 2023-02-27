import { Button, Center, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';

export const Footer = () => (
  <>
    <Center style={{ marginTop: 90, marginBottom: 50 }}>
      <Link href="https://github.com/hmbanan666/epictask" target="_blank">
        <Button radius="xl" variant="light" color="violet">
          <IconBrandGithub size={30} />
          <Text ml={5}>GitHub</Text>
        </Button>
      </Link>
    </Center>
  </>
);
