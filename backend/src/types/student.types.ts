import { Document } from 'mongoose';

export interface IStudent {
    _id?: string;
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    major: string;
    gpa: number;
    contactNumber?: string;
    program: string;
    semester: string;
    status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
    enrollmentDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStudentDocument extends IStudent, Document {}
