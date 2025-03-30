module.exports = {
  async up(db) {
    await db.createCollection('academic_records', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['givenName', 'familyName', 'academicEmail', 'dateOfBirth', 'programOfStudy', 'academicStanding', 'registrationDate'],
          properties: {
            givenName: {
              bsonType: 'string',
              minLength: 2,
              description: 'Given name must be a string of at least 2 characters'
            },
            familyName: {
              bsonType: 'string',
              minLength: 2,
              description: 'Family name must be a string of at least 2 characters'
            },
            academicEmail: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              description: 'Must be a valid email address'
            },
            dateOfBirth: {
              bsonType: 'date',
              description: 'Must be a valid date'
            },
            programOfStudy: {
              bsonType: 'string',
              minLength: 2,
              description: 'Program of study must be a string of at least 2 characters'
            },
            academicStanding: {
              bsonType: 'number',
              minimum: 0.0,
              maximum: 4.0,
              description: 'Academic standing must be a number between 0.0 and 4.0'
            },
            registrationDate: {
              bsonType: 'date',
              description: 'Registration date must be a valid date'
            },
            status: {
              bsonType: 'string',
              enum: ['active', 'inactive', 'graduated', 'on_leave'],
              description: 'Status must be one of: active, inactive, graduated, or on_leave'
            },
            notes: {
              bsonType: 'string',
              description: 'Optional notes about the student'
            }
          }
        }
      }
    });

    await db.collection('academic_records').createIndex(
      { academicEmail: 1 },
      { unique: true }
    );

    await db.collection('academic_records').createIndex(
      { givenName: 1, familyName: 1 }
    );

    await db.collection('academic_records').createIndex(
      { programOfStudy: 1 }
    );
  },

  async down(db) {
    await db.collection('academic_records').drop();
  }
}; 