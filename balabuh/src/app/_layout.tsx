import '@/global.css';
import { Stack } from 'expo-router';
import { GluestackUIProvider, ThemeProvider } from '@/providers';

export default function () {
  console.log('/_layout.tsx is being rendered');

  return (
    <ThemeProvider>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
