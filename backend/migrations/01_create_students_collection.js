module.exports = {
  async up(db, client) {
    // Create students collection with validation
    await db.createCollection('students', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['firstName', 'lastName', 'email', 'dateOfBirth', 'major', 'gpa'],
          properties: {
            firstName: {
              bsonType: 'string',
              description: 'First name is required'
            },
            lastName: {
              bsonType: 'string',
              description: 'Last name is required'
            },
            email: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              description: 'Email must be a valid email address'
            },
            dateOfBirth: {
              bsonType: 'date',
              description: 'Date of birth is required'
            },
            major: {
              bsonType: 'string',
              description: 'Major is required'
            },
            gpa: {
              bsonType: 'double',
              minimum: 0.0,
              maximum: 4.0,
              description: 'GPA must be between 0 and 4'
            },
            enrollmentDate: {
              bsonType: 'date',
              description: 'Enrollment date will be automatically set'
            }
          }
        }
      }
    });

    // Create unique index on email
    await db.collection('students').createIndex(
      { email: 1 },
      { unique: true }
    );

    // Create index on names for faster searching
    await db.collection('students').createIndex(
      { firstName: 1, lastName: 1 }
    );
  },

  async down(db, client) {
    // Drop indexes
    await db.collection('students').dropIndexes();
    
    // Drop the collection
    await db.collection('students').drop();
  }
}; 