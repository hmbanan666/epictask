import React from 'react';
import { Container } from '@mantine/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Logo } from './Logo';

export const Header = () => {
  const isHomePage = useRouter().asPath === '/';

  return (
    <header style={{ marginTop: 60, marginBottom: 30 }}>
      <Container>
        {isHomePage ? (
          <Logo />
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
      </Container>
    </header>
  );
};
