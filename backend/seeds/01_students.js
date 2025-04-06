/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('students').del()
  
  // Inserts seed entries
  await knex('students').insert([
    {
      studentId: 'STU1234567',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dateOfBirth: '2000-01-15',
      major: 'Computer Science',
      gpa: 3.8,
      program: 'Bachelor of Science',
      semester: 'Fall 2023',
      status: 'Active',
      enrollmentDate: '2020-09-01'
    },
    {
      studentId: 'STU7654321',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      dateOfBirth: '1999-05-20',
      major: 'Business Administration',
      gpa: 3.5,
      program: 'Bachelor of Business',
      semester: 'Fall 2023',
      status: 'Active',
      enrollmentDate: '2020-09-01'
    },
    {
      studentId: 'STU9876543',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      dateOfBirth: '1998-11-10',
      major: 'Engineering',
      gpa: 3.2,
      program: 'Bachelor of Engineering',
      semester: 'Fall 2023',
      status: 'Graduated',
      enrollmentDate: '2019-09-01'
    },
    {
      studentId: 'STU4567890',
      firstName: 'Emily',
      lastName: 'Williams',
      email: 'emily.williams@example.com',
      dateOfBirth: '2001-03-25',
      major: 'Psychology',
      gpa: 3.9,
      program: 'Bachelor of Arts',
      semester: 'Fall 2023',
      status: 'Active',
      enrollmentDate: '2021-09-01'
    },
    {
      studentId: 'STU2345678',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@example.com',
      dateOfBirth: '1999-08-05',
      major: 'Biology',
      gpa: 2.8,
      program: 'Bachelor of Science',
      semester: 'Fall 2023',
      status: 'On Leave',
      enrollmentDate: '2020-09-01'
    }
  ]);
}; 