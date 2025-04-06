# IT6203 IT Design Studio
# Your Name
# Date

# Student Record Application Lab Report

## 1. PROJECT DESCRIPTION

### Problem Statement
Educational institutions need an efficient way to manage student information. The current manual processes for tracking student records are time-consuming, error-prone, and lack real-time access to information. Administrators need a centralized system to create, view, update, and delete student records quickly and accurately.

### Target Users
- School administrators
- Academic advisors
- Faculty members
- Student services staff
- IT support personnel

### Key Features
- Create, view, update, and delete student records
- Advanced search and filtering capabilities
- Data validation to ensure accuracy
- Responsive design for mobile access
- User-friendly interface

### System Architecture
- Front End: Angular
- Back End: NodeJS and ExpressJS
- Database: MongoDB

## 2. PROJECT DESIGN

### Database Schema
Students Collection:
- studentId: String (required, unique)
- firstName: String (required)
- lastName: String (required)
- email: String (required, unique)
- dateOfBirth: Date (required)
- major: String (required)
- gpa: Number (required, 0.0-4.0)
- contactNumber: String (optional)
- program: String (required)
- semester: Number (required)
- status: String (required, enum: Active/Inactive/Graduated/Suspended)
- enrollmentDate: Date (required, default: current date)
- createdAt: Date (required, default: current date)
- updatedAt: Date (required, default: current date)

### User Stories and Acceptance Criteria

#### Create Student Record:
- **Story**: As an administrator, I want to add a new student to the system so that I can track their academic progress.
- **Acceptance Criteria**: 
  - The system should validate all required fields
  - The system should check for duplicate student IDs and emails
  - The system should automatically set the enrollment date to the current date
  - The system should display a success message after creating the record

#### View Student Records:
- **Story**: As an administrator, I want to view all student records so that I can access student information quickly.
- **Acceptance Criteria**: 
  - The system should display student records in a paginated table
  - The system should allow sorting by any column
  - The system should allow filtering by multiple criteria
  - The system should display a loading indicator while fetching data

#### Update Student Record:
- **Story**: As an administrator, I want to update a student's information so that I can keep their records current.
- **Acceptance Criteria**: 
  - The system should pre-populate the form with existing student data
  - The system should validate all fields before saving
  - The system should update the "updatedAt" timestamp
  - The system should display a success message after updating

#### Delete Student Record:
- **Story**: As an administrator, I want to delete a student record so that I can remove outdated information.
- **Acceptance Criteria**: 
  - The system should ask for confirmation before deleting
  - The system should remove the record from the database
  - The system should update the student list immediately
  - The system should display a success message after deletion

## 3. PROJECT EVALUATION

### Results

#### Design
The database schema, user stories, and acceptance criteria effectively captured the users' needs. The schema includes all necessary fields for comprehensive student information management, while the user stories cover the core CRUD operations with clear acceptance criteria that ensure functionality and user experience.

#### Implementation
The application was successfully developed using Angular for the frontend and Node.js with Express for the backend, following the specified architecture. The implementation adhered to best practices including:
- Clean code architecture with separation of concerns
- Responsive design principles
- Form validation on both client and server sides
- Error handling and user feedback
- RESTful API design

#### Functionality
The application successfully meets all specified requirements. Users can create, view, update, and delete student records without issues. The system provides real-time validation, intuitive navigation, and a clean, minimalist interface that enhances usability.

### Evaluation

#### Success
The project was successful in meeting its objectives. The application provides a complete solution for student record management with a modern, minimalist UI that enhances the user experience. The system is fully functional, allowing administrators to efficiently manage student information.

#### Challenges
- Implementing server-side rendering (SSR) in Angular required careful configuration to avoid platform-specific errors
- Ensuring consistent styling across different browsers and devices
- Balancing feature-rich functionality with a minimalist design approach
- Managing state between components in a complex Angular application

#### Improvements
- Add user authentication and role-based access control
- Implement data export functionality (PDF, Excel)
- Add advanced reporting and analytics features
- Enhance mobile responsiveness for smaller devices
- Implement offline capabilities with service workers
- Add multi-language support for international users 