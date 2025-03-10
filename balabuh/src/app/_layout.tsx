import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const profileButton = <ProfileButton />;
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'Balabuh',
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => profileButton,
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}

function ProfileButton() {
  return (
    <Avatar size='md'>
      <AvatarFallbackText>User Profile</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}
      />
      <AvatarBadge />
    </Avatar>
  );
}
