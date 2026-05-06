import { Notification, PRIORITY_WEIGHTS, NotificationType } from '@/types/notification';

/**
 * Sort notifications by priority weight (descending), then by timestamp (latest first).
 * Placement (3) > Result (2) > Event (1)
 */
export const sortByPriority = (notifications: Notification[]): Notification[] => {
  return [...notifications].sort((a, b) => {
    const weightA = PRIORITY_WEIGHTS[a.notification_type] || 0;
    const weightB = PRIORITY_WEIGHTS[b.notification_type] || 0;

    // Sort by weight descending
    if (weightB !== weightA) return weightB - weightA;

    // Within same type, sort by timestamp descending (latest first)
    const dateA = new Date(a.timestamp || a.created_at || 0).getTime();
    const dateB = new Date(b.timestamp || b.created_at || 0).getTime();
    return dateB - dateA;
  });
};

/**
 * Get the top priority notifications (e.g., top 5).
 */
export const getTopPriorityNotifications = (
  notifications: Notification[],
  count: number = 5
): Notification[] => {
  return sortByPriority(notifications).slice(0, count);
};

/**
 * Get a color palette for each notification type.
 */
export const getNotificationColor = (type: NotificationType): string => {
  switch (type) {
    case 'Placement':
      return '#7c3aed'; // violet
    case 'Result':
      return '#0ea5e9'; // sky blue
    case 'Event':
      return '#f59e0b'; // amber
    default:
      return '#64748b'; // slate
  }
};

/**
 * Get a gradient for each notification type (for card accents).
 */
export const getNotificationGradient = (type: NotificationType): string => {
  switch (type) {
    case 'Placement':
      return 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)';
    case 'Result':
      return 'linear-gradient(135deg, #0ea5e9 0%, #67e8f9 100%)';
    case 'Event':
      return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
    default:
      return 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)';
  }
};

/**
 * Format a date string into a human-readable relative or absolute format.
 */
export const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  } catch {
    return dateStr;
  }
};
