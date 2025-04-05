import mongoose from 'mongoose';
import { IStudent } from '../types/student.types';

const studentSchema = new mongoose.Schema<IStudent>({
    studentId: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
        trim: true,
        match: [/^[A-Z0-9]{8}$/, 'Student ID must be 8 characters (uppercase letters and numbers)']
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    major: {
        type: String,
        required: [true, 'Major is required'],
        trim: true,
        minlength: [2, 'Major must be at least 2 characters']
    },
    gpa: {
        type: Number,
        required: [true, 'GPA is required'],
        min: [0, 'GPA must be at least 0'],
        max: [4, 'GPA cannot exceed 4']
    },
    contactNumber: {
        type: String,
        trim: true,
        match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number']
    },
    program: {
        type: String,
        required: [true, 'Program is required'],
        trim: true
    },
    semester: {
        type: String,
        required: [true, 'Semester is required'],
        trim: true
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['Active', 'Inactive', 'Graduated', 'Suspended'],
            message: 'Status must be one of: Active, Inactive, Graduated, Suspended'
        },
        default: 'Active'
    },
    enrollmentDate: {
        type: Date,
        required: [true, 'Enrollment date is required'],
        default: Date.now
    }
}, {
    timestamps: true
});

// Create indexes
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ lastName: 1, firstName: 1 });
studentSchema.index({ major: 1 });

// Export the model
export const Student = mongoose.model<IStudent>('Student', studentSchema);