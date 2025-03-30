import { Document } from 'mongoose';

export interface IStudent {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    major: string;
    gpa: number;
    enrollmentDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStudentDocument extends IStudent, Document {}
