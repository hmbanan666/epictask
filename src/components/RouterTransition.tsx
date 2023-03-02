import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  completeNavigationProgress,
  NavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { globalStyles } from '../utils/styles';

export function RouterTransition() {
  const { theme } = globalStyles();
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
      url !== router.asPath && startNavigationProgress();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const handleComplete = () => void completeNavigationProgress();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath]);

  return (
    <NavigationProgress
      autoReset
      color={theme.colors.violet[4]}
      exitTimeout={700}
    />
  );
}
