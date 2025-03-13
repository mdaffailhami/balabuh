import '@/global.css';
import { Stack } from 'expo-router';
import { GluestackUIProvider, ThemeModeProvider } from '@/providers';
import { useColorScheme } from 'react-native';
import { theme } from '@/configs';

export default function () {
  console.debug('/_layout is being rendered');

  return (
    <ThemeModeProvider>
      <GluestackUIProvider>
        <Routes />
      </GluestackUIProvider>
    </ThemeModeProvider>
  );
}

function Routes() {
  const colorScheme = useColorScheme() || 'light';

  return (
    <Stack
      screenOptions={{
        statusBarBackgroundColor: theme[colorScheme]['--color-background'],
        navigationBarColor: theme[colorScheme]['--color-background'],
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
