# Video Content Marketplace - Technical Architecture

## System Overview
The application is a Telegram Mini App that enables creators to sell video content to their fans. It's built using:
- Frontend: React + TypeScript + ShadcnUI
- Backend: Express.js + TypeScript
- Database: PostgreSQL with Drizzle ORM
- Platform: Telegram Mini App Platform

## Frontend Architecture

### Core Components
- **App Layout**: Single-page application with dynamic routing
- **Pages**:
  - Home: Video marketplace listing
  - Creator Dashboard: Analytics and video management
  - Upload: Video content upload interface
- **Components**:
  - VideoCard: Displays video preview and purchase options
  - CreatorProfile: Shows creator information
  - UI Components: From ShadcnUI library

### State Management
- React Query for server state
- React's useState/useContext for local state
- Form state managed by react-hook-form

### Routing
Using wouter for lightweight routing:
- `/`: Home/marketplace
- `/dashboard`: Creator dashboard
- `/upload`: Video upload form

## Backend Architecture

### API Endpoints
- Videos:
  - GET `/api/videos`: List all videos
  - POST `/api/videos`: Create new video
- Creator:
  - GET `/api/creator/videos`: Get creator's videos
  - GET `/api/creator/purchases`: Get creator's sales
- Purchases:
  - POST `/api/purchases`: Create new purchase

### Middleware
- Express.json for request parsing
- Error handling middleware
- Logging middleware

## Database Schema

### Tables
1. creators
   - id (PK)
   - telegram_id (unique)
   - name
   - bio
   - avatar_url
   - created_at

2. videos
   - id (PK)
   - creator_id (FK)
   - title
   - description
   - price
   - video_url
   - thumbnail_url
   - created_at
   - duration

3. purchases
   - id (PK)
   - video_id (FK)
   - buyer_id
   - amount
   - created_at
   - status

## Authentication Flow
1. User opens mini app in Telegram
2. Telegram provides user data via WebApp.initData
3. Backend validates Telegram user data
4. Creator/buyer role determined by Telegram user ID

## Key Features & Components

### For Creators
- Video upload and management
- Sales analytics
- Revenue tracking
- Profile customization

### For Buyers
- Video browsing and search
- Secure purchase flow
- Access to bought content
- Creator discovery

### Technical Features
- Real-time updates using React Query
- Form validation with Zod
- Responsive design with Tailwind CSS
- Error handling and toast notifications
