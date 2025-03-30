import { Schema } from 'mongoose';

export async function up(db: any) {
    // Create students collection with schema
    await db.createCollection('students', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['firstName', 'lastName', 'email', 'dateOfBirth', 'major', 'gpa'],
                properties: {
                    firstName: {
                        bsonType: 'string',
                        minLength: 2,
                        description: 'First name is required and must be at least 2 characters'
                    },
                    lastName: {
                        bsonType: 'string',
                        minLength: 2,
                        description: 'Last name is required and must be at least 2 characters'
                    },
                    email: {
                        bsonType: 'string',
                        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                        description: 'Email is required and must be valid'
                    },
                    dateOfBirth: {
                        bsonType: 'date',
                        description: 'Date of birth is required'
                    },
                    major: {
                        bsonType: 'string',
                        minLength: 2,
                        description: 'Major is required and must be at least 2 characters'
                    },
                    gpa: {
                        bsonType: 'number',
                        minimum: 0,
                        maximum: 4,
                        description: 'GPA is required and must be between 0 and 4'
                    },
                    enrollmentDate: {
                        bsonType: 'date',
                        description: 'Enrollment date'
                    }
                }
            }
        }
    });

    // Create indexes
    await db.collection('students').createIndex({ email: 1 }, { unique: true });
    await db.collection('students').createIndex({ lastName: 1, firstName: 1 });
}

export async function down(db: any) {
    await db.collection('students').drop();
} 