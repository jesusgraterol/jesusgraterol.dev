import { type ReactNode } from 'react';

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

// the list of supported themes
type ITheme = 'dark' | 'light' | 'system';

// the props required by the context provider
type IThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: ITheme;
};

// the state of the context
type IThemeProviderState = {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type { ITheme, IThemeProviderProps, IThemeProviderState };
