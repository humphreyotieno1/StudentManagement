const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// Validation middleware
const validateStudent = (req, res, next) => {
  const { studentId, firstName, lastName, email, dateOfBirth, major, gpa, enrollmentDate, status, program, semester } = req.body;
  
  const errors = [];
  
  // Student ID validation
  if (!studentId) {
    errors.push('Student ID is required');
  } else if (!/^[A-Z0-9]{10}$/.test(studentId)) {
    errors.push('Student ID must be 10 characters (uppercase letters and numbers)');
  }
  
  // Name validation
  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  
  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Date validation
  if (!dateOfBirth) errors.push('Date of birth is required');
  if (!enrollmentDate) errors.push('Enrollment date is required');
  
  // Academic validation
  if (!program) errors.push('Program is required');
  if (!semester) errors.push('Semester is required');
  if (!major) errors.push('Major is required');
  
  // GPA validation
  if (gpa === undefined || gpa === null) {
    errors.push('GPA is required');
  } else if (isNaN(gpa) || gpa < 0 || gpa > 4) {
    errors.push('GPA must be between 0 and 4');
  }
  
  // Status validation
  if (!status) {
    errors.push('Status is required');
  } else if (!['Active', 'Inactive', 'Graduated', 'Suspended', 'On Leave'].includes(status)) {
    errors.push('Status must be one of: Active, Inactive, Graduated, Suspended, On Leave');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  next();
};

// Student routes
router.get('/students', async (req, res) => {
  try {
    const students = await knex('students').select('*');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/students', validateStudent, async (req, res) => {
  try {
    const student = req.body;
    const [newStudent] = await knex('students').insert(student).returning('*');
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(400).json({ error: 'Student ID or email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.put('/students/:id', validateStudent, async (req, res) => {
  try {
    const { id } = req.params;
    const student = req.body;
    const [updatedStudent] = await knex('students')
      .where('studentId', id)
      .update(student)
      .returning('*');
    
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(400).json({ error: 'Student ID or email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await knex('students').where('studentId', id).del();
    
    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 