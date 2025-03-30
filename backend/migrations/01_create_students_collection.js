module.exports = {
  async up(db) {
    await db.createCollection('students', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['firstName', 'lastName', 'email', 'dateOfBirth', 'major', 'gpa'],
          properties: {
            firstName: {
              bsonType: 'string',
              minLength: 2,
              description: 'First name must be a string of at least 2 characters'
            },
            lastName: {
              bsonType: 'string',
              minLength: 2,
              description: 'Last name must be a string of at least 2 characters'
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
              description: 'Major must be a string of at least 2 characters'
            },
            gpa: {
              bsonType: 'number',
              minimum: 0.0,
              maximum: 4.0,
              description: 'GPA must be a number between 0.0 and 4.0'
            },
            enrollmentDate: {
              bsonType: 'date',
              description: 'Enrollment date must be a valid date'
            }
          }
        }
      }
    });

    await db.collection('students').createIndex(
      { email: 1 },
      { unique: true }
    );

    await db.collection('students').createIndex(
      { lastName: 1, firstName: 1 }
    );

    await db.collection('students').createIndex(
      { major: 1 }
    );
  },

  async down(db) {
    await db.collection('students').drop();
  }
}; 