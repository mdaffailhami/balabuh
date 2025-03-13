import { Box, Center, Text } from '@/components';
import { cn } from '@/utils';
import React from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';

export function IconButton({
  className,
  tooltip,
  onPress,
  children,
}: {
  className?: string;
  tooltip?: { text: string; placement: 'top' | 'right' | 'bottom' | 'left' };
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}) {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

  const openTooltip = () => setIsTooltipVisible(true);
  const closeTooltip = () => setIsTooltipVisible(false);

  return (
    <>
      <Center className={cn('', className)}>
        <Pressable
          className='rounded-full p-2 active:bg-glassy-1'
          onPress={onPress}
          // the && operator is a short-circuit operator that only evaluates the right-hand side if the left-hand side is truthy
          // in this case, if `tooltip` is falsy (i.e. `undefined` or `null`), the `onHoverIn` prop will not be set at all
          onHoverIn={tooltip && openTooltip}
          onHoverOut={tooltip && closeTooltip}
          onLongPress={tooltip && openTooltip}
          onPressOut={
            tooltip &&
            (() => {
              setTimeout(() => {
                closeTooltip();
              }, 1500);
            })
          }
        >
          {children}
        </Pressable>
      </Center>
      {tooltip && (
        <Box
          className={cn(
            'absolute z-50 block rounded-md bg-glassy-4 px-3 py-1.5',
            {
              hidden: isTooltipVisible,
              'bottom-12 -translate-x-[32.25%]': tooltip.placement == 'top',
              // 'left-[4rem] top-[12.5%]': tooltip.placement == 'right',
              '-bottom-1/2 -translate-x-[50%]': tooltip.placement == 'bottom',
              'top-[12.5%] -translate-x-full': tooltip.placement == 'left',
            },
          )}
        >
          <Text className='text-background'>{tooltip.text}</Text>
        </Box>
      )}
    </>
  );
}
