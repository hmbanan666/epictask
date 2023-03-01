import { Avatar, Box, Group, Indicator, Menu, Text } from '@mantine/core';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { globalStyles } from '../utils/styles';

export const UserMenu = () => {
  const { theme } = globalStyles();

  const { data: session } = useSession();

  const handleClickSignOut = () => {
    void signOut();
  };

  if (!session) return null;

  return (
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
  );
};
