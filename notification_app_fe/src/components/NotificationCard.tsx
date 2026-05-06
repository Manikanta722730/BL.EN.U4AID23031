'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import Work from '@mui/icons-material/Work';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import MarkEmailRead from '@mui/icons-material/MarkEmailRead';
import Circle from '@mui/icons-material/Circle';
import { Notification, NotificationType } from '@/types/notification';
import { getNotificationColor, getNotificationGradient, formatDate } from '@/utils/helpers';

interface NotificationCardProps {
  notification: Notification;
  isRead: boolean;
  onMarkRead: (id: string) => void;
}

/**
 * Get an icon component based on the notification type.
 */
const getTypeIcon = (type: NotificationType) => {
  switch (type) {
    case 'Placement':
      return <Work sx={{ fontSize: 20 }} />;
    case 'Result':
      return <EmojiEvents sx={{ fontSize: 20 }} />;
    case 'Event':
      return <EventIcon sx={{ fontSize: 20 }} />;
    default:
      return <EventIcon sx={{ fontSize: 20 }} />;
  }
};

/**
 * A single notification card with type-based coloring, read/unread state,
 * and hover animations.
 */
const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  isRead,
  onMarkRead,
}) => {
  const theme = useTheme();
  const color = getNotificationColor(notification.notification_type);
  const gradient = getNotificationGradient(notification.notification_type);
  const dateStr = notification.timestamp || notification.created_at || '';

  return (
    <Card
      elevation={isRead ? 0 : 2}
      sx={{
        position: 'relative',
        overflow: 'visible',
        opacity: isRead ? 0.75 : 1,
        border: `1px solid ${
          isRead
            ? theme.palette.divider
            : theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.08)'
        }`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 40px ${color}22`,
          borderColor: `${color}55`,
        },
        // Left accent bar
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          borderRadius: '16px 0 0 16px',
          background: gradient,
        },
      }}
      onClick={() => {
        if (!isRead) onMarkRead(notification._id);
      }}
    >
      <CardContent sx={{ pl: 3, pr: 2, py: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          {/* Type icon circle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: `${color}18`,
              color: color,
              flexShrink: 0,
              mt: 0.25,
            }}
          >
            {getTypeIcon(notification.notification_type)}
          </Box>

          {/* Content */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Header row: title + chip + unread dot */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 0.5,
                flexWrap: 'wrap',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: isRead ? 500 : 700,
                  fontSize: '0.95rem',
                  lineHeight: 1.3,
                  flexGrow: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {notification.title || 'Untitled Notification'}
              </Typography>

              {!isRead && (
                <Circle
                  sx={{
                    fontSize: 8,
                    color: color,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.4 },
                    },
                  }}
                />
              )}

              <Chip
                label={notification.notification_type}
                size="small"
                icon={getTypeIcon(notification.notification_type)}
                sx={{
                  background: `${color}18`,
                  color: color,
                  borderColor: `${color}44`,
                  border: '1px solid',
                  fontSize: '0.72rem',
                  height: 26,
                  '& .MuiChip-icon': { color: color, fontSize: 14 },
                }}
              />
            </Box>

            {/* Message body */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.85rem',
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 1,
              }}
            >
              {notification.message || 'No details available.'}
            </Typography>

            {/* Footer: date + mark read */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.75rem',
                }}
              >
                {dateStr ? formatDate(dateStr) : ''}
              </Typography>

              {!isRead && (
                <Tooltip title="Mark as read" arrow>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkRead(notification._id);
                    }}
                    sx={{
                      color: color,
                      '&:hover': { background: `${color}15` },
                    }}
                  >
                    <MarkEmailRead sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
