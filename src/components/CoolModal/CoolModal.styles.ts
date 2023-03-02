import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {},
  modal: {
    padding: '30px 30px !important',
    borderRadius: 16,
  },
  header: {
    marginBottom: 34,
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1.2,
    color: theme.colors.dark[4],
  },
  close: {
    color: theme.colors.dark[4],
    svg: {
      width: 24,
      height: 24,
    },
  },
}));
