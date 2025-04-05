import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

async function main() {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/student_records');
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        
        // Drop existing collections to start fresh
        await db.collection('students').drop().catch(() => console.log('Students collection does not exist'));
        
        // Create new collections with proper schema
        await db.createCollection('students', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['studentId', 'firstName', 'lastName', 'email', 'dateOfBirth', 'major', 'gpa', 'program', 'semester', 'status', 'enrollmentDate'],
                    properties: {
                        studentId: {
                            bsonType: 'string',
                            pattern: '^[A-Z0-9]{8}$',
                            description: 'must be a string and match the pattern'
                        },
                        firstName: {
                            bsonType: 'string',
                            minLength: 2,
                            description: 'must be a string and is required'
                        },
                        lastName: {
                            bsonType: 'string',
                            minLength: 2,
                            description: 'must be a string and is required'
                        },
                        email: {
                            bsonType: 'string',
                            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                            description: 'must be a string and match the email pattern'
                        },
                        dateOfBirth: {
                            bsonType: 'date',
                            description: 'must be a date and is required'
                        },
                        major: {
                            bsonType: 'string',
                            minLength: 2,
                            description: 'must be a string and is required'
                        },
                        gpa: {
                            bsonType: 'number',
                            minimum: 0,
                            maximum: 4,
                            description: 'must be a number between 0 and 4 and is required'
                        },
                        contactNumber: {
                            bsonType: 'string',
                            pattern: '^\\+?[0-9]{10,15}$',
                            description: 'must be a string and match the phone pattern'
                        },
                        program: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                        semester: {
                            bsonType: 'string',
                            description: 'must be a string and is required'
                        },
                        status: {
                            enum: ['Active', 'Inactive', 'Graduated', 'Suspended'],
                            description: 'must be one of the enum values and is required'
                        },
                        enrollmentDate: {
                            bsonType: 'date',
                            description: 'must be a date and is required'
                        }
                    }
                }
            }
        });

        // Create indexes
        await db.collection('students').createIndex({ studentId: 1 }, { unique: true });
        await db.collection('students').createIndex({ email: 1 }, { unique: true });
        await db.collection('students').createIndex({ status: 1 });
        await db.collection('students').createIndex({ program: 1 });
        await db.collection('students').createIndex({ semester: 1 });
        await db.collection('students').createIndex({ major: 1 });

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

main(); 