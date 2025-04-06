import { Document } from 'mongoose';

interface IAddress {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

interface IEmergencyContact {
    name?: string;
    relationship?: string;
    phone?: string;
}

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
    status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended' | 'On Leave';
    enrollmentDate: Date;
    address?: IAddress;
    emergencyContact?: IEmergencyContact;
    academicStanding: 'Good Standing' | 'Academic Warning' | 'Academic Probation' | 'Academic Suspension';
    expectedGraduationDate?: Date;
    lastSemesterGPA?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IStudentDocument extends IStudent, Document {}
