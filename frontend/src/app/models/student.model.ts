export interface Student {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    major: string;
    gpa: number;
    enrollmentDate?: Date;
} 