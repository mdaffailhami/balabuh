import React from 'react';
import { colorScheme, useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'system' | 'light' | 'dark';

const ThemeContext = React.createContext<
  | {
      theme: Theme;
      cycleTheme: () => void;
      setTheme: (theme: Theme) => void;
    }
  | undefined
>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // const { colorScheme, setColorScheme: setTheme } = useColorScheme();

  // const theme: Theme = colorScheme
  //   ? (colorScheme.toLowerCase() as Theme)
  //   : 'system';

  const [theme, setTheme] = React.useState<Theme>('system');

  React.useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        console.log('savedTheme', savedTheme);
        setTheme(savedTheme as Theme);
      }
    };
    loadTheme();
  }, []);

  const cycleTheme = async () => {
    const nextTheme =
      theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setTheme(nextTheme);
    colorScheme.set(nextTheme);
    console.log('get', colorScheme.get());
    await AsyncStorage.setItem('theme', nextTheme);
  };

  console.log('theme', theme);

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = React.useContext(ThemeContext);

  if (!theme) throw new Error('useTheme must be used within a ThemeProvider');

  return theme;
}
