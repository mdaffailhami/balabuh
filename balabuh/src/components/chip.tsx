import { cn } from '@/utils';
import { Box, Text } from '.';

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
    <Box
      onTouchEnd={() => onPress(isActive)}
      className={cn('rounded-lg bg-faded px-3 py-1.5', {
        'bg-primary-container': isActive,
      })}
    >
      <Text className='font-semibold text-on-surface'>{label}</Text>
    </Box>
  );
}
