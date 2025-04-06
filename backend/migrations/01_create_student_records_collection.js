module.exports = {
  async up(db) {
    await db.createCollection('students', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["studentId", "firstName", "lastName", "email", "enrollmentDate", "status", "program", "semester"],
          properties: {
            studentId: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            firstName: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            lastName: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            email: {
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
              description: "must be a valid email and is required"
            },
            enrollmentDate: {
              bsonType: "date",
              description: "must be a date and is required"
            },
            status: {
              bsonType: "string",
              enum: ["active", "inactive", "graduated", "suspended"],
              description: "must be one of the enum values and is required"
            },
            program: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            semester: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            contactNumber: {
              bsonType: "string",
              description: "must be a string if the field exists"
            },
            address: {
              bsonType: "object",
              properties: {
                street: { bsonType: "string" },
                city: { bsonType: "string" },
                state: { bsonType: "string" },
                zipCode: { bsonType: "string" }
              }
            },
            academicInfo: {
              bsonType: "object",
              properties: {
                gpa: { bsonType: "double" },
                creditsCompleted: { bsonType: "int" },
                expectedGraduation: { bsonType: "date" }
              }
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date"
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date"
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
  },

  async down(db) {
    await db.collection('students').drop();
  }
}; 