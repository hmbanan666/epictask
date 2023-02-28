import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import { api } from '../utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <>
    <Head>
      <title>Epic Task</title>
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
            pre: {
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              padding: '1rem 1rem',
              background: theme.colors.violet[0],
              borderRadius: theme.radius.md,
              overflow: 'auto',
            },
          }),
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  </>
);

export default api.withTRPC(MyApp);
