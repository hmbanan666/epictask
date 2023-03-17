import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  content: {
    padding: '15px 15px !important',
    borderRadius: 16,
  },
  header: {
    marginBottom: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1.2,
    color: theme.colors.dark[4],
  },
  close: {
    color: theme.colors.dark[4],
    width: 40,
    height: 40,
    svg: {
      width: 30,
      height: 30,
    },
  },
}));
