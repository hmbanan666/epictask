import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppShell, MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { Notifications } from '@mantine/notifications';
import { api } from '../utils/api';
import { MyHeader } from '../components/MyHeader';
import { RouterTransition } from '../components/RouterTransition';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <>
    <Head>
      <title>Epic Task | Мост между разработчиками и бизнесом</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1.0, user-scalable=no"
      />
    </Head>

    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          globalStyles: (theme) => ({
            code: {
              fontFamily:
                'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
            },
            pre: {
              fontSize: '0.9rem',
              padding: '1rem 1rem',
              background: theme.colors.gray[0],
              borderRadius: theme.radius.md,
              overflow: 'auto',
            },
            ul: {
              paddingLeft: '1.5rem',
            },
            li: {
              '&::marker': {
                color: theme.colors.dark[2],
              },
            },
          }),
        }}
      >
        <Notifications position="top-center" />
        <AppShell header={<MyHeader />}>
          <RouterTransition />
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </SessionProvider>
  </>
);

export default api.withTRPC(MyApp);
