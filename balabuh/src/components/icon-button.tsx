import { Center, Tooltip, TooltipContent, TooltipText } from '@/components';
import React from 'react';
import { Pressable } from 'react-native';

export function IconButton({
  onPress,
  children,
}: {
  className?: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  console.debug('OPEN');

  return (
    <Tooltip
      isOpen={isOpen}
      placement='bottom'
      trigger={({ ref, onHoverIn, onHoverOut }) => (
        <Center>
          <Pressable
            className='rounded-full p-2 active:bg-faded'
            ref={ref}
            onHoverIn={onHoverIn}
            onHoverOut={onHoverOut}
            onPressIn={() => setIsOpen(true)}
            onPressOut={() => setIsOpen(false)}
          >
            {children}
          </Pressable>
        </Center>
      )}
    >
      <TooltipContent className='w-20'>
        <TooltipText>uwu lol</TooltipText>
      </TooltipContent>
    </Tooltip>
  );
}
