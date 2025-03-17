import { Box } from '@/components/box';
import { Center } from '@/components/center';
import { Text } from '@/components/text';
import { cn } from '@/utils';
import React from 'react';
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
    <>
      <Center className={cn('', className)}>
        <Pressable
          onPress={onPress}
          className='rounded-full p-2 active:bg-glassy-1'
        >
          {children}
        </Pressable>
      </Center>
    </>
  );
}
