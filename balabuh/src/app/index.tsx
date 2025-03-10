import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';

export default function Index() {
  return (
    <Center className='flex-1 bg-gray-900'>
      <Text className='text-red-500 tes'>
        Edit app/index.tsx to edit this screen.
      </Text>
    </Center>
  );
}
