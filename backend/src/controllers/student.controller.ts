import { Request, Response } from 'express';
import { Student } from '../models/student.model';
import { IStudent } from '../types/student.types';
import { HttpException } from '../middleware/error.middleware';

export const studentController = {
    // Get all students
    getAllStudents: async (req: Request, res: Response) => {
        try {
            const students = await Student.find().sort({ lastName: 1, firstName: 1 });
            res.status(200).json(students);
        } catch (error: any) {
            console.error('Error fetching students:', error);
            res.status(500).json({ message: 'Error fetching students', error: error.message });
        }
    },

    // Get single student
    getStudent: async (req: Request, res: Response) => {
        try {
            const student = await Student.findById(req.params.id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.status(200).json(student);
        } catch (error: any) {
            console.error('Error fetching student:', error);
            res.status(500).json({ message: 'Error fetching student', error: error.message });
        }
    },

    // Create student
    createStudent: async (req: Request<{}, {}, IStudent>, res: Response) => {
        try {
            console.log('Received student data:', req.body);

            // Convert and validate data types
            const studentData = {
                ...req.body,
                dateOfBirth: new Date(req.body.dateOfBirth),
                gpa: parseFloat(req.body.gpa.toString()),
                enrollmentDate: new Date()
            };

            console.log('Processed student data:', studentData);

            // Create new student instance
            const student = new Student(studentData);

            // Validate the document
            const validationError = student.validateSync();
            if (validationError) {
                console.error('Validation error:', validationError);
                return res.status(400).json({
                    message: 'Validation error',
                    errors: Object.values(validationError.errors).map(err => err.message)
                });
            }

            // Save the document
            const savedStudent = await student.save();
            console.log('Student saved successfully:', savedStudent);
            res.status(201).json(savedStudent);
        } catch (error: any) {
            console.error('Error creating student:', error);
            
            // Handle duplicate key error
            if (error.code === 11000) {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: ['Email address is already in use']
                });
            }

            // Handle validation errors
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: Object.values(error.errors).map((err: any) => err.message)
                });
            }

            // Handle other errors
            res.status(500).json({
                message: 'Error creating student',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    },

    // Update student
    updateStudent: async (req: Request<{ id: string }, {}, Partial<IStudent>>, res: Response) => {
        try {
            // Convert and validate data types
            const studentData = {
                ...req.body,
                dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : undefined,
                gpa: req.body.gpa ? parseFloat(req.body.gpa.toString()) : undefined,
                enrollmentDate: req.body.enrollmentDate ? new Date(req.body.enrollmentDate) : undefined
            };

            // Remove undefined values
            Object.keys(studentData).forEach(key => 
                studentData[key as keyof typeof studentData] === undefined && delete studentData[key as keyof typeof studentData]
            );

            const student = await Student.findByIdAndUpdate(
                req.params.id,
                studentData,
                { new: true, runValidators: true }
            );

            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            res.status(200).json(student);
        } catch (error: any) {
            console.error('Error updating student:', error);
            
            // Handle duplicate key error
            if (error.code === 11000) {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: ['Email address is already in use']
                });
            }

            // Handle validation errors
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: Object.values(error.errors).map((err: any) => err.message)
                });
            }

            res.status(500).json({
                message: 'Error updating student',
                error: error.message
            });
        }
    },

    // Delete student
    deleteStudent: async (req: Request, res: Response) => {
        try {
            const student = await Student.findByIdAndDelete(req.params.id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.status(200).json({ message: 'Student deleted successfully' });
        } catch (error: any) {
            console.error('Error deleting student:', error);
            res.status(500).json({ message: 'Error deleting student', error: error.message });
        }
    }
};