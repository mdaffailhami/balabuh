import { Center, Chip, Text } from '@/components';

export default function () {
  return (
    <Center className='flex-1 bg-background dark:bg-yellow-500'>
      <Chip />
      <Text className='font-bold text-primary'>Chat Screen</Text>
    </Center>
  );
}
