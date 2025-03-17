import { Box } from '@/components/box';
import { theme } from '@/configs';
import { cn } from '@/utils';
import {
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import {
  useColorScheme,
  TextInput as RNTextInput,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

type IconType = 'MaterialIcons' | 'Entypo' | 'FontAwesome6' | 'Ionicons';

export function TextInput({
  placeholder,
  prefixIcon,
  editable = true,
  onPress,
}: {
  placeholder: string;
  prefixIcon?: {
    type: IconType;
    name: string;
  };
  editable?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}) {
  const colorScheme = useColorScheme() || 'light';

  const iconConfig = {
    size: 16,
    color: theme[colorScheme]['--color-primary'],
    className: 'absolute left-3 top-1/2 -translate-y-1/2',
  };

  return (
    <Pressable className='active:opacity-50' onPress={onPress}>
      {(() => {
        if (!prefixIcon) return null;

        switch (prefixIcon.type) {
          case 'MaterialIcons':
            return (
              <MaterialIcons name={prefixIcon.name as any} {...iconConfig} />
            );
          case 'Entypo':
            return <Entypo name={prefixIcon.name as any} {...iconConfig} />;
          case 'FontAwesome6':
            return (
              <FontAwesome6 name={prefixIcon.name as any} {...iconConfig} />
            );
          case 'Ionicons':
            return <Ionicons name={prefixIcon.name as any} {...iconConfig} />;
        }
      })()}
      <RNTextInput
        className={cn(
          'h-13 rounded-lg border border-glassy-2 bg-surface pl-11 text-lg text-on-surface focus:border-2 focus:border-primary',
          {
            'px-3': !prefixIcon,
          },
        )}
        placeholder={placeholder}
        editable={editable}
        placeholderTextColor={theme[colorScheme]['--color-glassy-3']}
      />
    </Pressable>
  );
}
