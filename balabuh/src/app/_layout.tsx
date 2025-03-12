import '@/global.css';
import { Stack } from 'expo-router';
import { GluestackUIProvider, ThemeModeProvider } from '@/providers';

export default function () {
  console.log('/_layout.tsx is being rendered');

  return (
    <ThemeModeProvider>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </ThemeModeProvider>
  );
}
