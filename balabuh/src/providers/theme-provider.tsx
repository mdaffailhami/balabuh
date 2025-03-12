import React from 'react';
import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'system' | 'light' | 'dark';

const ThemeContext = React.createContext<
  | {
      theme: Theme;
      cycleTheme: () => void;
    }
  | undefined
>(undefined);

export function useTheme() {
  const theme = React.useContext(ThemeContext);

  if (!theme) throw new Error('useTheme must be used within a ThemeProvider');

  return theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();

  // const theme: Theme = colorScheme
  //   ? (colorScheme.toLowerCase() as Theme)
  //   : 'system';

  const [theme, setTheme] = React.useState<Theme>(colorScheme || 'system');

  React.useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        console.log('savedTheme', savedTheme);
        setTheme(savedTheme as Theme);
        setColorScheme(savedTheme as Theme);
      }
    };
    loadTheme();
  }, []);

  const cycleTheme = async () => {
    const nextTheme =
      theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';

    setTheme(nextTheme);
    setColorScheme(nextTheme);
    await AsyncStorage.setItem('theme', nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
