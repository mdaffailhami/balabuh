import { cn } from '@/utils';
import { Box, Text } from '.';
import { Pressable } from 'react-native';

export function Chip({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: (isActive: boolean) => void;
}) {
  return (
    <Pressable onPress={() => onPress(isActive)} className='active:opacity-50'>
      <Box
        className={cn('bg-glassy-1 rounded-lg px-4 py-1.5', {
          'bg-primary-container': isActive,
        })}
      >
        <Text
          className={cn('font-semibold text-on-surface', {
            'text-background': isActive,
          })}
        >
          {label}
        </Text>
      </Box>
    </Pressable>
  );
}
