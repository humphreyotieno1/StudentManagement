export interface Student {
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
    academicStanding: 'Good Standing' | 'Academic Warning' | 'Academic Probation' | 'Academic Suspension';
    lastSemesterGPA?: number;
    expectedGraduationDate?: Date;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    emergencyContact?: {
        name?: string;
        relationship?: string;
        phone?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
} 