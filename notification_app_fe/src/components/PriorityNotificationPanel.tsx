'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  Avatar,
} from '@mui/material';
import Work from '@mui/icons-material/Work';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import Star from '@mui/icons-material/Star';
import { Notification, NotificationType } from '@/types/notification';
import { getTopPriorityNotifications, getNotificationColor, formatDate } from '@/utils/helpers';

interface PriorityNotificationPanelProps {
  notifications: Notification[];
}

const getTypeIcon = (type: NotificationType) => {
  switch (type) {
    case 'Placement':
      return <Work sx={{ fontSize: 18 }} />;
    case 'Result':
      return <EmojiEvents sx={{ fontSize: 18 }} />;
    case 'Event':
      return <EventIcon sx={{ fontSize: 18 }} />;
    default:
      return <EventIcon sx={{ fontSize: 18 }} />;
  }
};

/**
 * Displays top priority notifications in a highlighted horizontal-scroll panel.
 * Priority: Placement > Result > Event, then by latest timestamp.
 */
const PriorityNotificationPanel: React.FC<PriorityNotificationPanelProps> = ({
  notifications,
}) => {
  const theme = useTheme();
  const topNotifications = getTopPriorityNotifications(notifications, 5);

  if (topNotifications.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      {/* Section header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Star sx={{ color: '#f59e0b', fontSize: 22 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Priority Notifications
        </Typography>
        <Chip
          label={`Top ${topNotifications.length}`}
          size="small"
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? 'rgba(245,158,11,0.15)'
                : 'rgba(245,158,11,0.1)',
            color: '#f59e0b',
            fontWeight: 700,
            fontSize: '0.7rem',
            height: 22,
          }}
        />
      </Box>

      {/* Horizontally scrollable cards */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 1,
          // Hide scrollbar but allow scroll
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.divider,
            borderRadius: 3,
          },
        }}
      >
        {topNotifications.map((n, idx) => {
          const color = getNotificationColor(n.notification_type);
          return (
            <Card
              key={n._id || idx}
              sx={{
                minWidth: 280,
                maxWidth: 320,
                flexShrink: 0,
                background:
                  theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${color}12 0%, ${theme.palette.background.paper} 100%)`
                    : `linear-gradient(135deg, ${color}08 0%, #fff 100%)`,
                border: `1px solid ${color}33`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px) scale(1.01)',
                  boxShadow: `0 8px 30px ${color}20`,
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                {/* Rank badge + type */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      background: `${color}22`,
                      color: color,
                    }}
                  >
                    {idx + 1}
                  </Avatar>
                  <Chip
                    icon={getTypeIcon(n.notification_type)}
                    label={n.notification_type}
                    size="small"
                    sx={{
                      background: `${color}18`,
                      color: color,
                      fontSize: '0.7rem',
                      height: 24,
                      '& .MuiChip-icon': { color: color, fontSize: 14 },
                    }}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {n.title || 'Untitled'}
                </Typography>

                {/* Message excerpt */}
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 1,
                  }}
                >
                  {n.message || 'No details available.'}
                </Typography>

                {/* Date */}
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.72rem',
                  }}
                >
                  {formatDate(n.timestamp || n.created_at || '')}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default PriorityNotificationPanel;
