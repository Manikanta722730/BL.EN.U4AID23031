'use client';

import React, { createContext, useContext, useMemo, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

/**
 * Theme provider that wraps MUI ThemeProvider with dark/light mode toggle.
 * Persists user preference in localStorage.
 */
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('campus_theme_mode');
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    }
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('campus_theme_mode', next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#0f172a',
                  paper: '#1e293b',
                },
                primary: { main: '#818cf8' },
                secondary: { main: '#f472b6' },
                text: {
                  primary: '#f1f5f9',
                  secondary: '#94a3b8',
                },
              }
            : {
                background: {
                  default: '#f8fafc',
                  paper: '#ffffff',
                },
                primary: { main: '#6366f1' },
                secondary: { main: '#ec4899' },
                text: {
                  primary: '#0f172a',
                  secondary: '#475569',
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: { fontWeight: 700 },
          h5: { fontWeight: 700 },
          h6: { fontWeight: 600 },
          subtitle1: { fontWeight: 500 },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                borderRadius: 16,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 10,
                fontWeight: 600,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 600,
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
