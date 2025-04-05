import { Request, Response } from 'express';
import { Student } from '../models/student.model';
import { IStudent } from '../types/student.types';
import { HttpException } from '../middleware/error.middleware';

export const studentController = {
    // Get all students
    getAllStudents: async (req: Request, res: Response) => {
        try {
            const students = await Student.find().sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                data: students
            });
        } catch (error: any) {
            console.error('Error fetching students:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Get single student
    getStudent: async (req: Request, res: Response) => {
        try {
            const student = await Student.findById(req.params.id);
            if (!student) {
                return res.status(404).json({
                    success: false,
                    error: 'Student not found'
                });
            }
            res.status(200).json({
                success: true,
                data: student
            });
        } catch (error: any) {
            console.error('Error fetching student:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Create student
    createStudent: async (req: Request, res: Response) => {
        try {
            const studentData: IStudent = {
                studentId: req.body.studentId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                dateOfBirth: new Date(req.body.dateOfBirth),
                major: req.body.major,
                gpa: parseFloat(req.body.gpa),
                contactNumber: req.body.contactNumber,
                program: req.body.program,
                semester: req.body.semester,
                status: req.body.status,
                enrollmentDate: new Date(req.body.enrollmentDate)
            };

            const student = new Student(studentData);
            await student.save();

            res.status(201).json({
                success: true,
                data: student
            });
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    error: 'Student ID or Email already exists'
                });
            }
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    error: 'Validation error',
                    errors: Object.values(error.errors).map((err: any) => err.message)
                });
            }
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    // Update student
    updateStudent: async (req: Request, res: Response) => {
        try {
            const studentData: Partial<IStudent> = {
                studentId: req.body.studentId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : undefined,
                major: req.body.major,
                gpa: req.body.gpa ? parseFloat(req.body.gpa) : undefined,
                contactNumber: req.body.contactNumber,
                program: req.body.program,
                semester: req.body.semester,
                status: req.body.status,
                enrollmentDate: req.body.enrollmentDate ? new Date(req.body.enrollmentDate) : undefined
            };

            const student = await Student.findByIdAndUpdate(
                req.params.id,
                studentData,
                { new: true, runValidators: true }
            );

            if (!student) {
                return res.status(404).json({
                    success: false,
                    error: 'Student not found'
                });
            }

            res.status(200).json({
                success: true,
                data: student
            });
        } catch (error: any) {
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    error: 'Student ID or Email already exists'
                });
            }
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    error: 'Validation error',
                    errors: Object.values(error.errors).map((err: any) => err.message)
                });
            }
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    // Delete student
    deleteStudent: async (req: Request, res: Response) => {
        try {
            const student = await Student.findByIdAndDelete(req.params.id);
            if (!student) {
                return res.status(404).json({
                    success: false,
                    error: 'Student not found'
                });
            }
            res.status(200).json({
                success: true,
                data: {}
            });
        } catch (error: any) {
            console.error('Error deleting student:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};