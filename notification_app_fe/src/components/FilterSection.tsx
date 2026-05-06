'use client';

import React from 'react';
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import FilterList from '@mui/icons-material/FilterList';
import Work from '@mui/icons-material/Work';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import AllInclusive from '@mui/icons-material/AllInclusive';
import { NotificationType } from '@/types/notification';

interface FilterSectionProps {
  filter: NotificationType | 'All';
  onFilterChange: (filter: NotificationType | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FILTER_OPTIONS: { value: NotificationType | 'All'; label: string; icon: React.ReactNode }[] = [
  { value: 'All', label: 'All', icon: <AllInclusive sx={{ fontSize: 16 }} /> },
  { value: 'Placement', label: 'Placement', icon: <Work sx={{ fontSize: 16 }} /> },
  { value: 'Result', label: 'Result', icon: <EmojiEvents sx={{ fontSize: 16 }} /> },
  { value: 'Event', label: 'Event', icon: <EventIcon sx={{ fontSize: 16 }} /> },
];

/**
 * Filter section with search bar and toggle buttons for notification types.
 */
const FilterSection: React.FC<FilterSectionProps> = ({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        gap: 2,
        mb: 3,
        p: 2.5,
        borderRadius: 3,
        background:
          theme.palette.mode === 'dark'
            ? 'rgba(30,41,59,0.6)'
            : 'rgba(241,245,249,0.8)',
        border: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Filter label */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <FilterList sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: theme.palette.text.secondary, whiteSpace: 'nowrap' }}
        >
          Filter:
        </Typography>
      </Box>

      {/* Toggle buttons */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_, val) => {
          if (val !== null) onFilterChange(val);
        }}
        size="small"
        sx={{
          flexWrap: 'wrap',
          '& .MuiToggleButton-root': {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '10px !important',
            mx: 0.5,
            px: isMobile ? 1.5 : 2,
            py: 0.75,
            fontSize: '0.8rem',
            fontWeight: 600,
            textTransform: 'none',
            gap: 0.5,
            '&.Mui-selected': {
              background: theme.palette.primary.main,
              color: '#fff',
              borderColor: theme.palette.primary.main,
              '&:hover': {
                background: theme.palette.primary.dark,
              },
            },
          },
        }}
      >
        {FILTER_OPTIONS.map((opt) => (
          <ToggleButton key={opt.value} value={opt.value}>
            {opt.icon}
            {!isMobile && opt.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Search bar */}
      <TextField
        size="small"
        placeholder="Search notifications..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
              </InputAdornment>
            ),
          }
        }}
        sx={{
          flexGrow: 1,
          maxWidth: { md: 320 },
          ml: { md: 'auto' },
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            fontSize: '0.85rem',
          },
        }}
      />
    </Box>
  );
};

export default FilterSection;
