import { createStyles } from '@mantine/core';

export const globalStyles = createStyles((theme) => ({
  wrapper: {
    padding: 30,
    minHeight: '100vh',

    [theme.fn.smallerThan('xs')]: {
      padding: 15,
    },
  },
  coolButton: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 14,
    minHeight: 48,
    backgroundColor: theme.colors.blue[5],

    '&:hover': {
      backgroundColor: theme.colors.blue[7],
    },
  },
  coolButtonTeal: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 14,
    minHeight: 48,
    backgroundColor: theme.colors.teal[5],

    '&:hover': {
      backgroundColor: theme.colors.teal[7],
    },
  },
  coolCard: {
    backgroundColor: theme.colors.gray[0],
    borderRadius: theme.radius.lg,
    minWidth: '100%',
  },
}));
