import '@/global.css';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/gluestack-ui-provider';

export default function () {
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
