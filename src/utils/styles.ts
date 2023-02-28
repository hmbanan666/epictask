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
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 14,
    minHeight: 36,
    color: '#fff',
    backgroundColor: theme.colors.violet[4],

    '&:hover': {
      backgroundColor: theme.colors.violet[5],
    },
  },
  coolCard: {
    backgroundColor: theme.colors.gray[0],
    borderRadius: theme.radius.lg,
    minWidth: '100%',
  },
}));
