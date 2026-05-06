# Campus Notify — Notification Microservice Frontend

A responsive, modern campus notifications dashboard built with **Next.js**, **Material UI**, and **TypeScript**.

## Features

- 🔔 Fetches notifications dynamically from API
- ⭐ Priority Notifications panel (Placement > Result > Event)
- 🔍 Search & filter by notification type
- 📄 Pagination with configurable page size
- 🌙 Dark / Light mode toggle (persisted)
- ✅ Read / Unread tracking (localStorage)
- 📱 Fully responsive (desktop & mobile)
- ⚠️ Error handling with toast notifications & retry
- 💀 Skeleton loading states

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Material UI 9
- Axios
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd notification_app_fe
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Folder Structure

```
src/
├── app/              # Next.js App Router pages & layout
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   ├── NotificationCard.tsx
│   ├── PriorityNotificationPanel.tsx
│   ├── FilterSection.tsx
│   ├── PaginationControls.tsx
│   ├── LoadingSkeleton.tsx
│   ├── EmptyState.tsx
│   └── ErrorState.tsx
├── context/          # React Context (Theme)
├── hooks/            # Custom hooks
│   ├── useNotifications.ts
│   └── useReadStatus.ts
├── services/         # API service layer
│   └── api.ts
├── types/            # TypeScript type definitions
│   └── notification.ts
└── utils/            # Helper utilities
    └── helpers.ts
```

## Priority Logic

| Type      | Weight | Priority |
|-----------|--------|----------|
| Placement | 3      | Highest  |
| Result    | 2      | Medium   |
| Event     | 1      | Lowest   |

Notifications are sorted by weight descending, then by timestamp descending.

## API Endpoint

```
GET http://20.207.122.201/evaluation-service/notifications
Query params: limit, page, notification_type
```
