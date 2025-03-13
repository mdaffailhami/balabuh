import { Box, Center, Text, Tooltip } from '@/components';
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
    <Tooltip
      Target={(props) => (
        <Center className={cn('', className)}>
          <Pressable
            className='rounded-full p-2 active:bg-faded'
            onPress={onPress}
            {...props}
          >
            {children}
          </Pressable>
        </Center>
      )}
    >
      <Text>Ini Tooltip :)</Text>
    </Tooltip>
  );
}
