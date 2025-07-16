import { useEffect, useState } from 'react';
import { ITheme, IThemeProviderProps } from '@/shared/contexts/theme/types.ts';
import { ThemeProviderContext } from '@/shared/contexts/theme/index.context.ts';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
const ThemeProvider = ({ children, defaultTheme = 'system', ...props }: IThemeProviderProps) => {
  const [theme, setTheme] = useState<ITheme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{ theme, setTheme }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { ThemeProvider };
