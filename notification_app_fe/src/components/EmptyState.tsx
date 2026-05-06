'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import InboxOutlined from '@mui/icons-material/InboxOutlined';

const EmptyState: React.FC<{ message?: string }> = ({ message = 'No notifications found.' }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 2 }}>
      <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: theme.palette.mode === 'dark' ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <InboxOutlined sx={{ fontSize: 40, color: theme.palette.text.secondary }} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>{message}</Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, maxWidth: 300, textAlign: 'center' }}>
        Try adjusting your filters or check back later for new notifications.
      </Typography>
    </Box>
  );
};

export default EmptyState;
