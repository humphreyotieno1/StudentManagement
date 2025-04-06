module.exports = {
  async up(db) {
    // Drop existing indexes
    await db.collection('students').dropIndexes();

    // Update the collection validator
    await db.command({
      collMod: 'students',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['studentId', 'firstName', 'lastName', 'email', 'dateOfBirth', 'major', 'gpa', 'program', 'semester', 'status', 'enrollmentDate', 'academicStanding'],
          properties: {
            studentId: {
              bsonType: 'string',
              pattern: '^[A-Z0-9]{10}$',
              description: 'Student ID must be 10 characters (uppercase letters and numbers)'
            },
            firstName: {
              bsonType: 'string',
              minLength: 2,
              description: 'First name must be at least 2 characters'
            },
            lastName: {
              bsonType: 'string',
              minLength: 2,
              description: 'Last name must be at least 2 characters'
            },
            email: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              description: 'Must be a valid email address'
            },
            dateOfBirth: {
              bsonType: 'date',
              description: 'Must be a valid date'
            },
            major: {
              bsonType: 'string',
              minLength: 2,
              description: 'Major must be at least 2 characters'
            },
            gpa: {
              bsonType: 'double',
              minimum: 0,
              maximum: 4,
              description: 'GPA must be between 0 and 4'
            },
            contactNumber: {
              bsonType: 'string',
              pattern: '^\\+?[0-9]{10,15}$',
              description: 'Must be a valid phone number'
            },
            program: {
              bsonType: 'string',
              description: 'Program is required'
            },
            semester: {
              bsonType: 'string',
              description: 'Semester is required'
            },
            status: {
              bsonType: 'string',
              enum: ['Active', 'Inactive', 'Graduated', 'Suspended', 'On Leave'],
              description: 'Status must be one of the allowed values'
            },
            enrollmentDate: {
              bsonType: 'date',
              description: 'Must be a valid date'
            },
            address: {
              bsonType: 'object',
              properties: {
                street: { bsonType: 'string' },
                city: { bsonType: 'string' },
                state: { bsonType: 'string' },
                zipCode: { bsonType: 'string' },
                country: { bsonType: 'string' }
              }
            },
            emergencyContact: {
              bsonType: 'object',
              properties: {
                name: { bsonType: 'string' },
                relationship: { bsonType: 'string' },
                phone: { bsonType: 'string' }
              }
            },
            academicStanding: {
              bsonType: 'string',
              enum: ['Good Standing', 'Academic Warning', 'Academic Probation', 'Academic Suspension'],
              description: 'Academic standing must be one of the allowed values'
            },
            expectedGraduationDate: {
              bsonType: 'date',
              description: 'Must be a valid date'
            },
            lastSemesterGPA: {
              bsonType: 'double',
              minimum: 0,
              maximum: 4,
              description: 'GPA must be between 0 and 4'
            }
          }
        }
      }
    });

    // Create new indexes
    await db.collection('students').createIndex({ email: 1 }, { unique: true });
    await db.collection('students').createIndex({ studentId: 1 }, { unique: true });
    await db.collection('students').createIndex({ lastName: 1, firstName: 1 });
    await db.collection('students').createIndex({ major: 1 });
    await db.collection('students').createIndex({ 'address.city': 1 });
    await db.collection('students').createIndex({ academicStanding: 1 });
  },

  async down(db) {
    // Revert to original indexes
    await db.collection('students').dropIndexes();
    await db.collection('students').createIndex({ studentId: 1 }, { unique: true });
    await db.collection('students').createIndex({ email: 1 }, { unique: true });
    await db.collection('students').createIndex({ status: 1 });
    await db.collection('students').createIndex({ program: 1 });
    await db.collection('students').createIndex({ semester: 1 });
  }
}; 