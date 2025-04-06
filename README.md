# Students System

A modern, minimalist full-stack solution for managing student information, developed with Angular, TypeScript, and Node.js.

## Features

- Student information management
  - Complete CRUD operations for student profiles
  - Advanced form validation with real-time feedback
  - Clean, minimalist UI with responsive layout
  - Material Design-inspired components
  - Multi-layer data validation
  - Responsive navigation with mobile support

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Community Edition (v6.0 or higher)
- Angular CLI (v16 or higher)
- npm or yarn package manager
- Git

## Project Structure

```
student-management/
├── frontend/          # Angular frontend application
│   ├── src/
│   │   ├── app/      # Application components
│   │   │   ├── components/  # UI components
│   │   │   ├── services/    # Business logic
│   │   │   └── models/      # Data models
│   │   ├── assets/   # Static assets
│   │   └── environments/   # Environment configurations
└── backend/          # Node.js backend application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   └── migrations/   # Database migrations
```

## UI Features

- Clean, minimalist responsive layout with navigation bar
- Dashboard with student statistics
- Student list with sorting and filtering
- Comprehensive student form with validation
- Material Design-inspired components
- Smooth transitions and animations
- Accessible form controls
- Mobile-friendly interface

## Setup Instructions

### MongoDB Installation

1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Create a data directory:
   ```bash
   mkdir C:\data\db
   ```
4. Start MongoDB service:
   ```bash
   net start MongoDB
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/student_info
   NODE_ENV=development
   RATE_LIMIT_WINDOW=15
   RATE_LIMIT_MAX=100
   ```

4. Run database migrations:
   ```bash
   npm run migrate:up
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200`

## API Documentation

The API documentation is available at `http://localhost:8000/api-docs` when the backend server is running.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 