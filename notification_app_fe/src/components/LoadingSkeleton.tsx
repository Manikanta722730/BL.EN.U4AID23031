'use client';

import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';

/**
 * Loading skeleton that mimics the notification card layout.
 */
const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} sx={{ borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: '12px', flexShrink: 0 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: '8px' }} />
              </Box>
              <Skeleton variant="text" width="90%" height={18} />
              <Skeleton variant="text" width="40%" height={18} />
              <Skeleton variant="text" width="25%" height={16} sx={{ mt: 1 }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default LoadingSkeleton;
