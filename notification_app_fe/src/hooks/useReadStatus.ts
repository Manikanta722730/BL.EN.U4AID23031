'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing read/unread notification state via localStorage.
 * Persists the set of read notification IDs across sessions.
 */
export const useReadStatus = () => {
  const STORAGE_KEY = 'campus_notifications_read';

  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        setReadIds(new Set(parsed));
      }
    } catch {
      console.warn('Failed to load read status from localStorage');
    }
  }, []);

  // Persist to localStorage whenever readIds changes
  const persist = useCallback(
    (ids: Set<string>) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
      } catch {
        console.warn('Failed to save read status to localStorage');
      }
    },
    []
  );

  const markAsRead = useCallback(
    (id: string) => {
      setReadIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const markAllAsRead = useCallback(
    (ids: string[]) => {
      setReadIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.add(id));
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const isRead = useCallback(
    (id: string) => readIds.has(id),
    [readIds]
  );

  const unreadCount = useCallback(
    (allIds: string[]) => allIds.filter((id) => !readIds.has(id)).length,
    [readIds]
  );

  return { readIds, markAsRead, markAllAsRead, isRead, unreadCount };
};
