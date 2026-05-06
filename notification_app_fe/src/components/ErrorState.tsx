'use client';

import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import Error from '@mui/icons-material/Error';
import Refresh from '@mui/icons-material/Refresh';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 2 }}>
      <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Error sx={{ fontSize: 40, color: '#ef4444' }} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Something went wrong</Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, maxWidth: 400, textAlign: 'center' }}>{message}</Typography>
      <Button variant="contained" startIcon={<Refresh />} onClick={onRetry} sx={{ mt: 1, px: 3 }}>
        Retry
      </Button>
    </Box>
  );
};

export default ErrorState;
