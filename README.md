# Student Management System

A comprehensive full-stack solution for managing student information, developed with Angular, TypeScript, and Node.js.

## Features

- Student information management
  - Complete CRUD operations for student profiles
  - Advanced form validation with real-time feedback
  - Modern UI with responsive layout
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

- Modern responsive layout with navigation bar
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
   MONGODB_URI=mongodb://localhost:27017/student_records
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

3. Create a `.env` file in the frontend directory with the following content:
   ```
   API_URL=http://localhost:8000
   ENVIRONMENT=development
   APP_TITLE=Student Management System
   ```

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:8000

2. Start the frontend development server:
   ```bash
   cd frontend
   ng serve
   ```
   The frontend will run on http://localhost:4200

### Production Mode

1. Build the frontend:
   ```bash
   cd frontend
   ng build --configuration production
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm run build
   npm start
   ```

## Available Scripts

### Backend Scripts

- `npm run dev`: Start development server with hot reloading
- `npm run build`: Build TypeScript code
- `npm start`: Start production server
- `npm run migrate:up`: Run database migrations
- `npm run migrate:down`: Rollback migrations
- `npm run migrate:status`: Check migration status
- `npm run lint`: Run ESLint
- `npm test`: Run tests

### Frontend Scripts

- `ng serve`: Start development server
- `ng build`: Build production version
- `ng test`: Run unit tests
- `ng lint`: Run linting
- `ng generate`: Generate components, services, etc.

## API Documentation

The backend API provides the following endpoints:

### Student Records
- `GET /api/students`: Get all student records
- `GET /api/students/:id`: Get specific student record
- `POST /api/students`: Create new student record
- `PUT /api/students/:id`: Update student record
- `DELETE /api/students/:id`: Delete student record

## Student Data Model

Each student record includes:
- Student ID (required, 8 characters, uppercase letters and numbers)
- First Name (required, min 2 chars)
- Last Name (required, min 2 chars)
- Email (required, valid format)
- Date of Birth (required)
- Major (required, min 2 chars)
- GPA (required, 0.0-4.0 scale)
- Contact Number (optional, 10-15 digits)
- Program (required)
- Semester (required)
- Status (required, Active/Inactive/Graduated/Suspended)
- Enrollment Date (required, defaults to current date)

## UI Components

### Navigation
- Responsive navigation bar
- Mobile-friendly menu
- Active route highlighting
- Smooth transitions

### Dashboard
- Student statistics overview
- Total students count
- Active students count
- New enrollments this month

### Student List
- Sortable columns
- Filtering capabilities
- Action buttons for edit/delete
- Responsive table layout

### Student Form
- Two-column responsive grid layout
- Clear visual hierarchy
- Intuitive field grouping
- Real-time validation feedback
- Mobile-optimized design

### Styling Features
- Modern color scheme
- Consistent spacing and typography
- Smooth transitions and animations
- Accessible form controls
- Error state handling
- Loading states
- Responsive breakpoints


## License

This project is licensed under the MIT License. 