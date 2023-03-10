import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: theme.spacing.sm,
  },
  input: {
    height: 'auto',
    paddingTop: 20,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 400,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.gray[2],

    '&:focus': {
      outline: 'none !important',
      boxShadow: 'none !important',
      borderColor: theme.colors.violet[5],
    },
  },
  wrapper: {
    '&:focus, &:focus-within': {
      outline: 'none !important',
      boxShadow: 'none !important',
      border: 'none !important',
    },
  },
  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.md,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
  icon: {
    paddingTop: 18,
    color: theme.colors.gray[5],
  },
  dropdown: {
    borderRadius: 14,
  },
  item: {
    borderRadius: 14,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,

    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: theme.colors.violet[1],
        color: theme.colors.violet[5],
      },
    },
  },
}));
