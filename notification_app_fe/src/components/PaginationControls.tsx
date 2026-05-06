'use client';

import React from 'react';
import {
  Box,
  Pagination,
  Select,
  MenuItem,
  Typography,
  FormControl,
  useTheme,
} from '@mui/material';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

/**
 * Pagination controls with page selector and items-per-page dropdown.
 */
const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mt: 4,
        py: 2,
      }}
    >
      {/* Items per page */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem' }}>
          Show:
        </Typography>
        <FormControl size="small">
          <Select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            sx={{
              borderRadius: '10px',
              fontSize: '0.85rem',
              minWidth: 70,
              '& .MuiSelect-select': { py: 0.75 },
            }}
          >
            {[5, 10, 15, 20, 25].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem' }}>
          per page
        </Typography>
      </Box>

      {/* Page selector */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, val) => onPageChange(val)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            fontWeight: 600,
            borderRadius: '10px',
            fontSize: '0.85rem',
          },
        }}
      />
    </Box>
  );
};

export default PaginationControls;
