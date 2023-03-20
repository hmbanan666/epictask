import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: theme.spacing.sm,
  },
  input: {
    height: 'auto',
    minHeight: 58,
    paddingTop: 25,
    paddingBottom: 12,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.2,
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
    paddingTop: 8,
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
  tooltip: {
    fontSize: theme.fontSizes.sm,
    height: 'auto',
    lineHeight: 1.2,
    marginBottom: theme.spacing.xs,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    borderRadius: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.gray[0],
    background: theme.colors.gray[0],
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  tooltipInputLength: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
    color: theme.colors.dark[1],
  },
}));
