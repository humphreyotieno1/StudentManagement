export interface Student {
    _id?: string;
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string | Date | null;
    major: string;
    gpa: number;
    contactNumber?: string;
    program: string;
    semester: string;
    status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
    enrollmentDate: string | Date | null;
    createdAt?: Date;
    updatedAt?: Date;
} 