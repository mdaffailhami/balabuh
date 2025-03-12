import React from 'react';
import { ColorSchemeName, useColorScheme, View, ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import { ThemeMode, useThemeMode } from '@/providers';

import { vars } from 'nativewind';
import { theme as appTheme } from '@/configs';

export const config = {
  light: vars(appTheme.light),
  dark: vars(appTheme.dark),
};

const getColorSchemeName = (
  colorScheme: ColorSchemeName,
  theme: ThemeMode,
): 'light' | 'dark' => {
  if (theme === 'system') {
    return colorScheme ?? 'light';
  }

  return theme;
};

export function GluestackUIProvider({
  ...props
}: {
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const colorScheme = useColorScheme();
  const { themeMode } = useThemeMode();

  const colorSchemeName = getColorSchemeName(colorScheme, themeMode);

  return (
    <View
      style={[
        config[colorSchemeName],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
