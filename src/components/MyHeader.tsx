import React from 'react';
import { Button, Group, Header } from '@mantine/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { IconBrandGithub } from '@tabler/icons-react';
import { Logo } from './Logo';
import { globalStyles } from '../utils/styles';
import { UserMenu } from './UserMenu';

export const MyHeader = () => {
  const { classes, theme } = globalStyles();
  const isHomePage = useRouter().asPath === '/';

  const { data: session, status } = useSession();

  const handleClickSignIn = () => {
    void signIn('github');
  };

  const UserBlock = () => {
    if (status === 'loading') return null;

    return (
      <>
        {session ? (
          <UserMenu />
        ) : (
          <Button
            className={classes.epicButton}
            leftIcon={<IconBrandGithub />}
            color="violet"
            onClick={handleClickSignIn}
          >
            Войти
          </Button>
        )}
      </>
    );
  };

  return (
    <Header
      fixed
      height={60}
      style={{ borderBottom: `1px solid ${theme.colors.gray[2]}` }}
    >
      <Group style={{ justifyContent: 'space-between' }}>
        {isHomePage ? (
          <Logo />
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}

        <Group style={{ marginRight: 15 }}>
          <UserBlock />
        </Group>
      </Group>
    </Header>
  );
};
