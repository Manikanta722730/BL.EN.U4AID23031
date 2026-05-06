'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import School from '@mui/icons-material/School';
import { useThemeMode } from '@/context/ThemeContext';

interface NavbarProps {
  unreadCount: number;
}

/**
 * Top navigation bar with app title, unread badge, and theme toggle.
 */
const Navbar: React.FC<NavbarProps> = ({ unreadCount }) => {
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          mode === 'dark'
            ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e293b 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a78bfa 100%)',
        borderBottom: `1px solid ${
          mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.2)'
        }`,
        backdropFilter: 'blur(20px)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        {/* Logo & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <School sx={{ color: '#fff', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: '#fff',
                fontWeight: 800,
                fontSize: { xs: '1rem', md: '1.25rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Campus Notify
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.7rem',
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Notification Microservice
            </Typography>
          </Box>
        </Box>

        {/* Unread badge */}
        <IconButton sx={{ color: '#fff', mr: 1 }}>
          <Badge
            badgeContent={unreadCount}
            color="error"
            max={99}
            sx={{
              '& .MuiBadge-badge': {
                fontWeight: 700,
                fontSize: '0.7rem',
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Theme toggle */}
        <IconButton
          onClick={toggleMode}
          sx={{
            color: '#fff',
            background: 'rgba(255,255,255,0.1)',
            '&:hover': { background: 'rgba(255,255,255,0.2)' },
            borderRadius: '10px',
            width: 40,
            height: 40,
          }}
        >
          {mode === 'dark' ? (
            <LightMode sx={{ fontSize: 20 }} />
          ) : (
            <DarkMode sx={{ fontSize: 20 }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
