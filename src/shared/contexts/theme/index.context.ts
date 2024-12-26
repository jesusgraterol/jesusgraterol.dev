import { createContext } from 'react';
import { IThemeProviderState } from '@/shared/contexts/theme/types.ts';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
const ThemeProviderContext = createContext<IThemeProviderState>({
  theme: 'system',
  setTheme: () => null,
});





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  ThemeProviderContext,
};
