import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  IconButton,
} from '@/components';
import { Tabs } from 'expo-router';
import { theme } from '@/configs';
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useThemeMode } from '@/providers';
import { useColorScheme } from 'react-native';
import { capitalize } from '@/utils';

export default function () {
  console.debug('/(tabs)/_layout is being rendered');

  const colorScheme = useColorScheme() || 'light';

  const iconSize = 30;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme[colorScheme]['--color-background'],
          shadowColor: theme[colorScheme]['--color-on-background'],
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          elevation: 5,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          color: theme[colorScheme]['--color-primary'],
        },
        headerRight: () => <HeaderRight />,
        tabBarStyle: {
          backgroundColor: theme[colorScheme]['--color-background'],
        },
        tabBarActiveTintColor: `${theme[colorScheme]['--color-primary']}`,
        tabBarInactiveTintColor: `${theme[colorScheme]['--color-glassy-2']}`,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Balabuh',
          tabBarLabel: 'Beranda',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='activity'
        options={{
          title: 'Aktivitas',
          tabBarLabel: 'Aktivitas',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='format-list-bulleted'
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: 'Chat',
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'}
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function HeaderRight() {
  return (
    <HStack className='gap-x-2.5'>
      <CycleThemeButton />
      <ProfileButton className='mr-4' />
    </HStack>
  );
}

function CycleThemeButton() {
  const colorScheme = useColorScheme() || 'light';
  const { themeMode, cycleThemeMode } = useThemeMode();

  const size = 24;
  const color = theme[colorScheme]['--color-on-background'];

  return (
    <IconButton
      tooltip={{
        placement: 'top',
        text: `${capitalize(themeMode)} theme`,
      }}
      onPress={() => cycleThemeMode()}
    >
      {(() => {
        if (themeMode == 'light') {
          return <MaterialIcons name='light-mode' size={size} color={color} />;
        } else if (themeMode == 'dark') {
          return <MaterialIcons name='dark-mode' size={size} color={color} />;
        } else {
          return (
            <MaterialCommunityIcons
              name='theme-light-dark'
              size={size}
              color={color}
            />
          );
        }
      })()}
    </IconButton>
  );
}

function ProfileButton({ className }: { className: string }) {
  return (
    <Avatar size='md' className={className}>
      <AvatarFallbackText>User Profile</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: 'https://avatars.githubusercontent.com/u/74972129?v=4',
        }}
      />
      <AvatarBadge className='bg-primary' />
    </Avatar>
  );
}
