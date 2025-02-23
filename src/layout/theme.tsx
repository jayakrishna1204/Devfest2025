'use client';
import './globals.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Cinzel, Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const cinzel = Cinzel({
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
});

const primary = '#408330';
// const primary = "#d14f34";
const secondary = '#FFB74D';
// const primary = "#c14d32";
// const secondary = "#36666a";
// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '2rem',
          lineHeight: '1.2',
          margin: '3rem 0',
          fontWeight: 'normal',
          fontFamily: 'var(--font-cinzel)',
        },
        h2: {
          fontSize: '1.7rem',
          lineHeight: '1.2',
          margin: '3rem 0',
          fontWeight: 'normal',
          fontFamily: 'var(--font-cinzel)',
        },
        h3: {
          fontSize: '1.17rem',
          lineHeight: '1.2',
          fontWeight: 'normal',
        },
        h4: {
          fontSize: '1rem',
          lineHeight: '1.3',
          fontWeight: 'normal',
        },
      },
    },
  },
});

export const bodyClass = ''; //roboto.variable + ' ' + cinzel.variable;
export const htmlClass = roboto.variable + ' ' + cinzel.variable;

export const MobileOnlySx = { display: { xs: 'block', sm: 'none' } };
export const DesktopOnlySx = { display: { xs: 'none', sm: 'block' } };

export const MuiProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </AppRouterCacheProvider>
);

export default theme;
