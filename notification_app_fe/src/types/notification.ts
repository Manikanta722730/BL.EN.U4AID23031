// Notification type definitions

export type NotificationType = 'Event' | 'Result' | 'Placement';

export interface Notification {
  _id: string;
  title: string;
  message: string;
  notification_type: NotificationType;
  timestamp: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown; // allow extra fields from API
}

export interface NotificationsResponse {
  notifications: Notification[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

// Priority weight mapping: Placement > Result > Event
export const PRIORITY_WEIGHTS: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};
