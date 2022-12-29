import { createTheme } from '@mui/material/styles';
import { ThemeOptions as ThemeOptionsOld } from '@mui/material/styles/createTheme';

// Custom theme: Colors
const themeColors = {
  color: {
    primary: '#563d82',
    white: '#fff',
    purple: '#7b568f',
  },
} as const;

// Override style Mui
const themeOptions: ThemeOptionsOld = {
  ...themeColors,
  palette: {
    primary: {
      main: themeColors.color.primary,
    },
    secondary: {
      main: themeColors.color.primary,
    },
  },
  components: {},
};

// Create theme
export const theme = createTheme({ ...themeColors, ...themeOptions });
