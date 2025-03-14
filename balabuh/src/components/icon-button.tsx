import { Box, Center, Text } from '@/components';
import { cn } from '@/utils';
import { Layout } from '@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types';
import React from 'react';
import {
  GestureResponderEvent,
  LayoutRectangle,
  Pressable,
} from 'react-native';

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
  // const [hiddenTooltipLayout, setHiddenTooltipLayout] = React.useState<
  // LayoutRectangle | undefined
  // >(undefined);
  const [tooltipWidth, setTooltipWidth] = React.useState(0);

  const openTooltip = () => setIsTooltipVisible(true);
  const closeTooltip = () => setIsTooltipVisible(false);

  console.log(tooltipWidth);

  return (
    <Box className='bg-red-500'>
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
        <>
          <Box
            onLayout={(e) =>
              tooltipWidth == 0
                ? setTooltipWidth(e.nativeEvent.layout.width)
                : null
            }
            style={{ display: tooltipWidth != 0 ? 'none' : 'flex' }}
            className='bottom-96 z-50 rounded-md bg-glassy-4 px-3 py-1.5'
          >
            <Text className='text-background'>{tooltip.text}</Text>
          </Box>
          <Box
            style={{ width: tooltipWidth }}
            className={cn(
              'translate-10 absolute z-50 w-full rounded-md bg-glassy-4 px-3 py-1.5',
              {
                hidden: isTooltipVisible,
                'left-1/2 translate-x-10': tooltip.placement == 'top',
              },
            )}
          >
            <Text className='text-background'>{tooltip.text}</Text>
          </Box>
        </>
      )}
    </Box>
  );
}
