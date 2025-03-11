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
  FontAwesome,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useTheme } from '@/providers';

export default function () {
  console.log('/(tabs)/_layout.tsx is being rendered');

  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
        headerRight: () => <HeaderRight />,
        tabBarActiveTintColor: `rgb(${theme.light['--color-primary']})`,
        tabBarInactiveTintColor: `rgb(${theme.light['--color-outline']})`,
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
              size={28}
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
            <FontAwesome name='list-ul' size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: 'Chat',
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='commenting' size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function HeaderRight() {
  return (
    <HStack>
      <ChangeThemeButton />
      <ProfileButton className='mr-4' />
    </HStack>
  );
}

function ChangeThemeButton() {
  const { theme, cycleTheme } = useTheme();

  console.log(theme);
  return (
    <IconButton onPress={() => cycleTheme()}>
      {(() => {
        if (theme == 'light') {
          return <MaterialIcons name='light-mode' size={24} color='black' />;
        } else if (theme == 'dark') {
          return <MaterialIcons name='dark-mode' size={24} color='black' />;
        } else {
          return (
            <MaterialCommunityIcons
              name='theme-light-dark'
              size={24}
              color='black'
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
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}
      />
      <AvatarBadge className='bg-primary' />
    </Avatar>
  );
}
