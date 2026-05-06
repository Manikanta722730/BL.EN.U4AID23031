'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchNotifications } from '@/services/api';
import { Notification, NotificationType } from '@/types/notification';

interface UseNotificationsOptions {
  initialPage?: number;
  initialLimit?: number;
  initialFilter?: NotificationType | 'All';
}

interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  filter: NotificationType | 'All';
  searchQuery: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilter: (filter: NotificationType | 'All') => void;
  setSearchQuery: (query: string) => void;
  refetch: () => void;
  filteredNotifications: Notification[];
}

/**
 * Custom hook for fetching, filtering, searching, and paginating notifications.
 */
export const useNotifications = (
  options: UseNotificationsOptions = {}
): UseNotificationsReturn => {
  const {
    initialPage = 1,
    initialLimit = 10,
    initialFilter = 'All',
  } = options;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<NotificationType | 'All'>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, unknown> = { page, limit };
      // Only pass notification_type if filtering by a specific type
      if (filter !== 'All') {
        params.notification_type = filter;
      }

      const data = await fetchNotifications(params as { limit: number; page: number; notification_type?: string });
      setNotifications(data.notifications || []);

      // Calculate total pages from the response
      if (data.totalPages) {
        setTotalPages(data.totalPages);
      } else if (data.total) {
        setTotalPages(Math.ceil(data.total / limit));
      } else {
        // If API doesn't return total, estimate from the returned data
        setTotalPages(data.notifications.length < limit ? page : page + 1);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch notifications';
      setError(message);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filter]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Client-side search filtering
  const filteredNotifications = notifications.filter((n) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      (n.title && n.title.toLowerCase().includes(query)) ||
      (n.message && n.message.toLowerCase().includes(query))
    );
  });

  return {
    notifications,
    loading,
    error,
    page,
    limit,
    totalPages,
    filter,
    searchQuery,
    setPage,
    setLimit,
    setFilter: (f: NotificationType | 'All') => {
      setFilter(f);
      setPage(1); // Reset to page 1 when filter changes
    },
    setSearchQuery,
    refetch: loadNotifications,
    filteredNotifications,
  };
};
