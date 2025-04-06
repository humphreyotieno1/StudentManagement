# Student Management System

A modern web application for managing student records, built with Angular and Node.js.

## Features

- Student CRUD operations
- Comprehensive student information management
- Real-time form validation
- Responsive design
- Status tracking for students
- Academic information management

## Tech Stack

### Frontend
- Angular 17
- TypeScript
- RxJS
- Angular Router
- Angular Forms

### Backend
- Node.js
- Express.js
- SQLite3
- Knex.js (Query Builder)
- CORS

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v17 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Configuration

### Backend (.env)
Create a `.env` file in the backend directory with the following variables:
```
PORT=8000
NODE_ENV=development
DB_CLIENT=sqlite3
DB_FILENAME=./db/dev.sqlite3
CORS_ORIGIN=http://localhost:4200
```

### Frontend (.env)
Create a `.env` file in the frontend directory with the following variables:
```
API_URL=http://localhost:8000/api
```

## Database Setup

1. Create the database and run migrations:
   ```bash
   cd backend
   npx knex migrate:latest
   ```

2. Seed the database with sample data:
   ```bash
   npx knex seed:run
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```
   The server will run on http://localhost:8000

2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```
   The application will be available at http://localhost:4200

## API Endpoints

### Students
- GET `/api/students` - Get all students
- GET `/api/students/:id` - Get a specific student
- POST `/api/students` - Create a new student
- PUT `/api/students/:id` - Update a student
- DELETE `/api/students/:id` - Delete a student

## Data Model

### Student
- studentId (string, primary key)
- firstName (string)
- lastName (string)
- email (string, unique)
- dateOfBirth (date)
- major (string)
- program (string)
- semester (string)
- gpa (decimal)
- enrollmentDate (date)
- status (enum: Active, Inactive, Graduated, Suspended, On Leave)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 