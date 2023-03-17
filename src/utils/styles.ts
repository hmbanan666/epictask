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
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 14,
    minHeight: 36,
    color: '#fff',
    backgroundColor: theme.colors.violet[4],

    '&:hover': {
      backgroundColor: `${theme.colors.violet[5]} !important`,
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
      backgroundColor: `${theme.colors.blue[5]} !important`,
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
      backgroundColor: `${theme.colors.green[6]} !important`,
    },
  },
  likeButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 14,
    minHeight: 48,
    color: '#fff',
    backgroundColor: theme.colors.red[5],

    '&:hover': {
      backgroundColor: `${theme.colors.red[6]} !important`,
    },
  },
  statInfoElement: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 14,
    color: theme.colors.dark[3],
    backgroundColor: theme.colors.gray[0],
  },
  coolCard: {
    backgroundColor: theme.colors.gray[0],
    borderRadius: theme.radius.lg,
    minWidth: '100%',
  },
  // Text editor
  coolTextEditorBlockTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: theme.colors.dark[1],
  },
  coolTextEditorRoot: {
    border: 'none',
    marginBottom: 30,
  },
  coolTextEditorContent: {
    backgroundColor: theme.colors.gray[0],
    borderRadius: theme.radius.lg,

    pre: {
      backgroundColor: theme.colors.gray[1],
    },
  },
}));
