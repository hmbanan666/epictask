import {
  Avatar,
  Box,
  Button,
  Group,
  Indicator,
  Menu,
  Text,
} from '@mantine/core';
import {
  IconCheck,
  IconLogout,
  IconPencilPlus,
  IconUserCircle,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { globalStyles } from '../utils/styles';
import { CoolModal } from './CoolModal';
import { CoolInputWithTooltip } from './CoolInputWithTooltip';
import { api } from '../utils/api';

export const UserMenu = () => {
  const { classes, theme } = globalStyles();
  const router = useRouter();

  const { data: session } = useSession();

  const handleClickSignOut = () => {
    void signOut();
  };

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = React.useState(false);

  // Create new task
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const taskMutation = api.task.create.useMutation({
    onSuccess: (data) => {
      if (!data?.id) return;

      updateNotification({
        id: 'create-task',
        color: 'green',
        title: 'Задача успешно создана!',
        message: 'Все хорошо. Сейчас сделаем редирект',
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      });

      void router.push(`/t/${data?.id}`);
    },
  });

  const handleClickAddNewTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!title || !description) return;

    e.preventDefault();
    showNotification({
      id: 'create-task',
      loading: true,
      title: 'Создаем Задачу...',
      message: 'Данные побежали на сервер, база зашуршала',
      color: 'blue',
      autoClose: false,
      disallowClose: true,
    });

    setIsNewTaskModalOpen(false);
    taskMutation.mutate({
      title,
      description,
    });
  };

  if (!session) return null;

  return (
    <>
      <Menu width={250} position="bottom-end">
        <Menu.Target>
          <Box>
            <Indicator
              label={0}
              size={20}
              showZero={false}
              dot={false}
              color="red"
              withBorder
              offset={3}
              position="top-end"
              styles={{
                indicator: {
                  cursor: 'pointer',
                  fontWeight: 600,
                },
              }}
            >
              <Avatar
                src={session?.user?.image}
                size={40}
                sx={{
                  borderRadius: 50,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              />
            </Indicator>
          </Box>
        </Menu.Target>

        <Menu.Dropdown
          style={{
            minWidth: 250,
            padding: 8,
            borderRadius: 14,
            boxShadow:
              '0px 16px 80px rgba(4, 15, 21, 0.15), 0px 40px 20px -30px rgba(4, 15, 21, 0.1)',
          }}
        >
          <Group
            style={{
              minHeight: 64,
              padding: 12,
              marginBottom: 8,
              borderRadius: 14,
              backgroundColor: theme.colors.violet[6],
            }}
          >
            <Avatar
              src={session?.user?.image}
              size={40}
              style={{ borderRadius: 50 }}
            />

            <Box>
              <Text style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>
                {session?.user?.name} {session?.user?.surname}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                @{session?.user?.username}
              </Text>
            </Box>
          </Group>

          <Link
            href={`/u/${session?.user?.username}`}
            style={{ textDecoration: 'none' }}
          >
            <Menu.Item
              icon={<IconUserCircle size={20} />}
              style={{
                fontSize: 15,
                padding: 14,
                borderRadius: 14,
                justifyContent: 'space-between',
              }}
            >
              Мой Профиль
            </Menu.Item>
          </Link>
          <Menu.Item
            icon={<IconPencilPlus size={20} />}
            style={{
              fontSize: 15,
              padding: 14,
              borderRadius: 14,
              justifyContent: 'space-between',
            }}
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            Создать задачу
          </Menu.Item>
          <Menu.Item
            icon={<IconLogout size={20} />}
            onClick={handleClickSignOut}
            style={{
              fontSize: 15,
              padding: 14,
              borderRadius: 14,
            }}
          >
            Выйти
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <CoolModal
        title="Новая Задача"
        opened={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
      >
        <form>
          <CoolInputWithTooltip
            label="Заголовок"
            maxLength={50}
            required
            value={title}
            onChange={setTitle}
          >
            Не используйте спецсимволы и теги
          </CoolInputWithTooltip>
          <CoolInputWithTooltip
            type="textarea"
            label="Короткое описание"
            maxLength={200}
            required
            value={description}
            onChange={setDescription}
          >
            Один абзац, в котором основная суть задачи. Не используйте
            спецсимволы и теги
          </CoolInputWithTooltip>

          <Button
            type="submit"
            onClick={(e) => handleClickAddNewTask(e)}
            className={classes.rareButton}
          >
            Создать Задачу
          </Button>
        </form>
      </CoolModal>
    </>
  );
};
