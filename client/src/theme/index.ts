import { createTheme } from '@mui/material/styles';
import { ThemeOptions as ThemeOptionsOld } from '@mui/material/styles/createTheme';

// Custom theme: Colors
const themeColors = {
  color: {
    primary: '#563d82',
    white: '#fff',
    green: '#6dd7ac',
    purple: '#7b568f',
    grey: '#e6e7e7',
  },
} as const;

// Override style Mui
const themeOptions: ThemeOptionsOld = {
  ...themeColors,
  palette: {
    primary: {
      main: themeColors.color.primary,
      contrastText: themeColors.color.grey,
    },
    secondary: {
      main: themeColors.color.purple,
      contrastText: themeColors.color.grey,
    },
  },
};

// Update for Typescript
type CustomTheme = {
  [Key in keyof typeof themeColors]: typeof themeColors[Key];
};
declare module '@mui/material/styles/createTheme' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

// Create theme
export const theme = createTheme({ ...themeColors, ...themeOptions });
