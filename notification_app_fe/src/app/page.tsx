'use client';

import React from 'react';
import { Container, Box, Typography, Button, Snackbar, Alert, useTheme } from '@mui/material';
import DoneAll from '@mui/icons-material/DoneAll';
import Navbar from '@/components/Navbar';
import PriorityNotificationPanel from '@/components/PriorityNotificationPanel';
import FilterSection from '@/components/FilterSection';
import NotificationCard from '@/components/NotificationCard';
import PaginationControls from '@/components/PaginationControls';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import { useNotifications } from '@/hooks/useNotifications';
import { useReadStatus } from '@/hooks/useReadStatus';

export default function HomePage() {
  const theme = useTheme();
  const {
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
    setFilter,
    setSearchQuery,
    refetch,
    filteredNotifications,
  } = useNotifications({ initialLimit: 10, initialPage: 1 });

  const { markAsRead, markAllAsRead, isRead, unreadCount } = useReadStatus();

  // Show error toast
  const [toastOpen, setToastOpen] = React.useState(false);
  React.useEffect(() => {
    if (error) setToastOpen(true);
  }, [error]);

  const allIds = notifications.map((n) => n._id);
  const currentUnread = unreadCount(allIds);

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default }}>
      <Navbar unreadCount={currentUnread} />

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Stats header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, letterSpacing: '-0.03em' }}>
              Notifications
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.25 }}>
              {currentUnread > 0 ? `${currentUnread} unread` : 'All caught up!'} · Page {page}
            </Typography>
          </Box>
          {currentUnread > 0 && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<DoneAll />}
              onClick={() => markAllAsRead(allIds)}
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
            >
              Mark all read
            </Button>
          )}
        </Box>

        {/* Priority section — show only when not filtering */}
        {filter === 'All' && !loading && notifications.length > 0 && (
          <PriorityNotificationPanel notifications={notifications} />
        )}

        {/* Filter & search */}
        <FilterSection
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Content area */}
        {loading ? (
          <LoadingSkeleton count={limit} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : filteredNotifications.length === 0 ? (
          <EmptyState message={searchQuery ? 'No matching notifications.' : 'No notifications found.'} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredNotifications.map((n) => (
              <NotificationCard
                key={n._id}
                notification={n}
                isRead={isRead(n._id)}
                onMarkRead={markAsRead}
              />
            ))}
          </Box>
        )}

        {/* Pagination */}
        {!loading && !error && filteredNotifications.length > 0 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={(l) => { setLimit(l); setPage(1); }}
          />
        )}
      </Container>

      {/* Error toast */}
      <Snackbar open={toastOpen} autoHideDuration={5000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setToastOpen(false)} severity="error" variant="filled" sx={{ borderRadius: '12px' }}>
          {error || 'An error occurred'}
        </Alert>
      </Snackbar>
    </Box>
  );
}
