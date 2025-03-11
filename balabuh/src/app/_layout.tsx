import '@/global.css';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@/providers';

export default function () {
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
