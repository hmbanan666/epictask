import { Modal } from '@mantine/core';
import useStyles from './CoolModal.styles';

export const CoolModal = ({
  title,
  opened,
  onClose,
  children,
}: {
  title: string;
  opened: boolean;
  onClose: (arg: boolean) => void;
  children: JSX.Element;
}) => {
  const { classes, theme } = useStyles();

  return (
    <Modal
      classNames={classes}
      size={550}
      opened={opened}
      onClose={() => onClose(false)}
      title={title}
      overlayProps={{
        color: theme.colors.dark[4],
        opacity: 0.5,
      }}
    >
      {children}
    </Modal>
  );
};
