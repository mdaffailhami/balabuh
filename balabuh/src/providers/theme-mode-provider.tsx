import React from 'react';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'system' | 'light' | 'dark';

const ThemeModeContext = React.createContext<
  | {
      themeMode: ThemeMode;
      cycleThemeMode: () => void;
    }
  | undefined
>(undefined);

export function useThemeMode() {
  const themeMode = React.useContext(ThemeModeContext);

  if (!themeMode)
    throw new Error('useThemeMode must be used within a ThemeModeProvider');

  return themeMode;
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [themeMode, setThemeMode] = React.useState<ThemeMode>(
    colorScheme || 'system',
  );

  React.useEffect(() => {
    const loadThemeMode = async () => {
      const savedThemeMode = await AsyncStorage.getItem('themeMode');
      if (savedThemeMode) {
        setThemeMode(savedThemeMode as ThemeMode);
        setColorScheme(savedThemeMode as ThemeMode);
      }
    };
    loadThemeMode();
  }, []);

  const cycleThemeMode = async () => {
    const nextThemeMode =
      themeMode === 'system'
        ? 'light'
        : themeMode === 'light'
          ? 'dark'
          : 'system';

    setThemeMode(nextThemeMode);
    setColorScheme(nextThemeMode);
    await AsyncStorage.setItem('themeMode', nextThemeMode);
  };

  return (
    <ThemeModeContext.Provider value={{ themeMode, cycleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}
