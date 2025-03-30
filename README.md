# Student Management System

A full-stack application for managing student records, built with Angular, TypeScript, and Node.js.

## Features

- Student information management
  - Complete CRUD operations for student profiles
  - Form validation with real-time feedback
  - Modern UI with responsive design
  - Data validation at multiple levels
  - MongoDB database with schema validation

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
│   │   └── styles/   # Global styles
└── backend/          # Node.js backend application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── middleware/   # Custom middleware
    │   ├── types/        # TypeScript types
    │   └── config/       # Configuration files
    └── migrations/       # Database migrations
```

## Database Schema

The application uses MongoDB with the following student schema:

```typescript
{
  firstName: string;      // Required, min 2 chars
  lastName: string;       // Required, min 2 chars
  email: string;         // Required, unique, valid email format
  dateOfBirth: Date;     // Required, valid date
  major: string;         // Required, min 2 chars
  gpa: number;          // Required, 0.0-4.0 scale
  enrollmentDate: Date;  // Auto-set on creation
  createdAt?: Date;     // Auto-set by Mongoose
  updatedAt?: Date;     // Auto-set by Mongoose
}
```

## Setup Instructions

### MongoDB Setup

1. Install MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   sudo systemctl start mongodb
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

3. Create a `.env` file in the backend directory:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/academic_records
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
- `npm run clean`: Clean build directory

### Frontend Scripts

- `ng serve`: Start development server
- `ng build`: Build production version
- `ng test`: Run unit tests
- `ng lint`: Run linting
- `ng generate`: Generate components, services, etc.

## API Endpoints

### Student Records
- `GET /api/students`: Get all student records
- `GET /api/students/:id`: Get specific student record
- `POST /api/students`: Create new student record
- `PUT /api/students/:id`: Update student record
- `DELETE /api/students/:id`: Delete student record

## Data Validation

The application implements validation at multiple levels:

1. Frontend Form Validation:
   - Required field validation
   - Email format validation
   - GPA range validation (0.0-4.0)
   - Date format validation

2. Backend Validation:
   - Mongoose schema validation
   - Custom middleware validation
   - MongoDB schema validation

3. Database Constraints:
   - Unique email constraint
   - Required fields
   - Field type validation
   - Range validation for numeric fields


## License

This project is licensed under the MIT License. 