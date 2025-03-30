# Student Management System

A full-stack application for managing student information, built with Angular, TypeScript, and Node.js.

## Features

- Student registration and management
  - Create, read, update, and delete student records
  - Form validation with error handling
  - Responsive design with Bootstrap
  - Data validation on both frontend and backend

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Angular CLI (v14 or higher)
- npm or yarn package manager

## Project Structure

```
student-management/
├── frontend/          # Angular frontend application
└── backend/          # Node.js backend application
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/student_management
   NODE_ENV=development
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

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   API_URL=http://localhost:8000
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

- `npm run dev`: Start the development server with hot reloading
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm run migrate:up`: Run database migrations
- `npm run migrate:down`: Rollback database migrations
- `npm run migrate:status`: Check migration status
- `npm run lint`: Run ESLint
- `npm test`: Run tests
- `npm run clean`: Clean the build directory

### Frontend Scripts

- `ng serve`: Start the development server
- `ng build`: Build the production version
- `ng test`: Run unit tests
- `ng e2e`: Run end-to-end tests
- `ng lint`: Run linting
- `ng generate`: Generate components, services, etc.

## API Documentation

The backend API provides the following endpoints:

### Students
- `GET /api/students`: Get all students
- `GET /api/students/:id`: Get a specific student
- `POST /api/students`: Create a new student
- `PUT /api/students/:id`: Update a student
- `DELETE /api/students/:id`: Delete a student

## Student Data Model

The student record includes the following fields:
- First Name (required, minimum 2 characters)
- Last Name (required, minimum 2 characters)
- Email (required, unique, valid email format)
- Date of Birth (required, cannot be in the future)
- Major (required, minimum 2 characters)
- GPA (required, between 0.0 and 4.0)
- Enrollment Date (automatically set to current date)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 