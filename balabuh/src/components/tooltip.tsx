import { Box } from '@/components/box';
import React from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  Modal,
  MouseEvent,
} from 'react-native';

export function Tooltip({
  Target,
  children,
}: {
  Target: ({
    onLayout,
    onHoverIn,
    onHoverOut,
  }: {
    onLayout: (event: LayoutChangeEvent) => void;
    onLongPress: (event: GestureResponderEvent) => void;
    onPressOut: (event: GestureResponderEvent) => void;
    onHoverIn: (event: MouseEvent) => void;
    onHoverOut: (event: MouseEvent) => void;
  }) => React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [targetLayout, setTargetLayout] = React.useState<
    LayoutRectangle | undefined
  >(undefined);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      {
        <Target
          onLayout={(e) => setTargetLayout(e.nativeEvent.layout)}
          onHoverIn={open}
          onHoverOut={close}
          onLongPress={open}
          onPressOut={() => {
            // setTimeout(() => {
            //   close();
            // }, 1500);
          }}
        />
      }
      {targetLayout && (
        <Modal visible={isOpen} animationType='fade'>
          <Box
            className='absolute rounded-xl bg-red-500'
            style={{
              bottom: targetLayout.y - 40,
              right: targetLayout.x + 20,
            }}
          >
            {children}
          </Box>
        </Modal>
      )}
    </>
  );
}
