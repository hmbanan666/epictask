import { createStyles } from '@mantine/core';

export const globalStyles = createStyles((theme) => ({
  wrapper: {
    padding: 30,
    minHeight: '100vh',

    [theme.fn.smallerThan('xs')]: {
      padding: 0,
    },
  },
  epicButton: {
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
  rareButton: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 14,
    minHeight: 36,
    color: '#fff',
    backgroundColor: theme.colors.blue[4],

    '&:hover': {
      backgroundColor: theme.colors.blue[5],
    },
  },
  commonButton: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 14,
    minHeight: 36,
    color: '#fff',
    backgroundColor: theme.colors.green[5],

    '&:hover': {
      backgroundColor: theme.colors.green[6],
    },
  },
  coolCard: {
    backgroundColor: theme.colors.gray[0],
    borderRadius: theme.radius.lg,
    minWidth: '100%',
  },
}));
