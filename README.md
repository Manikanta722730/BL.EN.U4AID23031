# Campus Notifications Microservice Portfolio

This repository contains a full-stack implementation of a **Campus Notifications Microservice**, featuring a premium Next.js frontend and a Node.js backend. The system is designed to provide high-priority campus updates with an emphasis on visual excellence and service reliability.

## 🚀 Project Overview

The Campus Notifications system centralizes critical campus communications such as Exam Results, Placement Drives, and Cultural Events. It utilizes a custom prioritization algorithm to ensure students never miss essential opportunities.

### Key Modules
- **Frontend (`/notification_app_fe`)**: A high-performance Next.js 16 dashboard using Material UI 9.
- **Backend (`/notification_app_be_folder`)**: A lightweight Node.js/Express server providing notification endpoints.
- **System Design**: A detailed architectural breakdown available in `notification_system_design.md`.

## ✨ Core Features

- **Priority-Driven UI**: Automatically ranks notifications (Placement > Result > Event).
- **Service Resilience**: Integrated fallback mechanism that switches to local mock data if the external API is unreachable.
- **Modern Dashboard**: Responsive cards with type-specific branding, hover effects, and skeleton loaders.
- **User Personalization**: 
  - Dark/Light mode persistent toggle.
  - Read/Unread state tracking for individual notifications.
- **Advanced Filtering**: Categorical filters and real-time search capabilities.
- **Full Responsiveness**: Seamless experience across mobile, tablet, and desktop devices.

## 🛠️ Technical Stack

- **Frontend**: Next.js 16, TypeScript, Material UI 9, Axios, Date-fns.
- **Backend**: Node.js, Express, CORS.
- **Dev Tools**: ESLint, Turbopack, Git.

## 📖 Setup Instructions

### Frontend
1. Navigate to the folder:
   ```bash
   cd notification_app_fe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend
1. Navigate to the folder:
   ```bash
   cd notification_app_be_folder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node node_server.js
   ```

## 📐 System Architecture
Detailed documentation on the priority algorithm, data models, and component structure can be found in **[notification_system_design.md](./notification_system_design.md)**.

---
**Created by**: Manikanta (BL.EN.U4AID23031)