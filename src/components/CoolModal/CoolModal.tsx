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
      classNames={{
        root: classes.root,
        modal: classes.modal,
        header: classes.header,
        title: classes.title,
        close: classes.close,
      }}
      size={550}
      opened={opened}
      onClose={() => onClose(false)}
      title={title}
      overlayColor={theme.colors.dark[4]}
      overlayOpacity={0.5}
    >
      {children}
    </Modal>
  );
};
