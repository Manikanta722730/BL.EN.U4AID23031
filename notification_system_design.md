# Campus Notifications Microservice — System Design Documentation

## 1. Project Overview
The Campus Notifications Microservice is a modern, responsive web application designed to centralize and prioritize campus-wide updates. It provides students and faculty with a streamlined dashboard to view Events, Results, and Placement opportunities, ensuring that critical information is highlighted through a custom priority-weighting algorithm.

## 2. Technical Architecture

### 2.1 Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI) 9
- **API Client**: Axios
- **Date Handling**: Native JS Date with custom helpers
- **State Persistence**: Browser LocalStorage

### 2.2 System Flow
1. **Request**: The application initializes and triggers a data fetch via a custom hook (`useNotifications`).
2. **API Interaction**: The `fetchNotifications` service attempts to call the remote endpoint.
3. **Resilience Layer**: If the API is unreachable (Network Error/CORS), the system automatically switches to a high-fidelity **Mock Data** source to maintain service availability.
4. **Data Processing**:
   - Notifications are filtered by type if requested.
   - The **Priority Algorithm** sorts the data: `Placement (Weight 3) > Result (Weight 2) > Event (Weight 1)`.
   - Secondary sorting is applied using the `timestamp` in descending order.
5. **Rendering**: Components utilize MUI's Theme Engine to render a dark/light responsive interface.

## 3. Data Model

### 3.1 Notification Structure
```typescript
interface Notification {
  _id: string;
  title: string;
  message: string;
  notification_type: 'Event' | 'Result' | 'Placement';
  timestamp: string; // ISO 8601
}
```

### 3.2 Priority Weights
- **Placement**: Weight 3 (Highest)
- **Result**: Weight 2 (Medium)
- **Event**: Weight 1 (Lowest)

## 4. Component Architecture

### 4.1 Dashboard Components
- **Navbar**: Sticky header with dynamic unread badge count and dark/light mode toggle.
- **PriorityNotificationPanel**: A highlighted horizontal-scroll section showcasing the top 5 most critical notifications based on the weighting algorithm.
- **FilterSection**: Responsive toggle group for category filtering (All/Placement/Result/Event) and a live search input.
- **NotificationList**: A vertical feed of individual `NotificationCard` components.
- **PaginationControls**: Dynamic page navigation with adjustable items-per-page (5, 10, 15, 20, 25).

### 4.2 Utility Components
- **LoadingSkeleton**: Layout-mimicking skeletons to prevent layout shift during data fetching.
- **EmptyState**: Visual feedback for zero-result queries.
- **ErrorState**: Reusable component with a retry mechanism for failed API interactions.

## 5. Key Features & Implementation Details

### 5.1 Sorting Algorithm
The core business logic is implemented in `sortByPriority`. It calculates a numerical score based on the `notification_type` and compares timestamps for notifications with equal weights.

### 5.2 State Management
- **Theme Context**: A React Context provider manages the MUI theme state and persists user preferences (`light` vs `dark`) in `localStorage`.
- **Read Status Hook**: A custom hook (`useReadStatus`) tracks seen notification IDs in `localStorage`, enabling visual "read" cues and unread count badges.

### 5.3 Responsive Design
- **Desktop**: Full-width layout with multi-column filtering.
- **Mobile**: Collapsed drawer-style interactions, stacked filter buttons, and fluid typography adjustments using MUI's `sx` prop and `useMediaQuery`.

## 6. API Integration & Error Handling
The application consumes a RESTful API: `http://20.207.122.201/evaluation-service/notifications`.
- **Fallback Strategy**: In the event of a `401 Unauthorized` or `CORS` error (common in local development environments), the system logs the error and gracefully degrades to `MOCK_NOTIFICATIONS`.
- **Normalization**: The service layer handles multiple API response formats (arrays vs objects) to ensure data consistency.

## 7. Future Enhancements
- **Push Notifications**: Integration with Firebase Cloud Messaging (FCM) for real-time browser alerts.
- **Rich Media**: Support for image attachments in notification cards.
- **Role-Based Access**: Specialized views for Administrators to post new notifications.
