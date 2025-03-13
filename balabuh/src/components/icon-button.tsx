import { Box, Center } from '@/components';
import { cn } from '@/utils';
import { GestureResponderEvent, Pressable } from 'react-native';

export function IconButton({
  className,
  onPress,
  children,
}: {
  className?: string;
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <Center className={cn('', className)}>
      <Pressable className='rounded-full p-2 active:bg-faded' onPress={onPress}>
        {children}
      </Pressable>
    </Center>
  );
}
