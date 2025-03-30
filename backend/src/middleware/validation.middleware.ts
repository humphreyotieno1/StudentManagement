import { Request, Response, NextFunction } from 'express';
import { HttpException } from './error.middleware';

export const validateStudent = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, dateOfBirth, major, gpa } = req.body;
        const errors: string[] = [];

        // Check required fields
        if (!firstName?.trim()) errors.push('First name is required');
        if (!lastName?.trim()) errors.push('Last name is required');
        if (!email?.trim()) errors.push('Email is required');
        if (!dateOfBirth) errors.push('Date of birth is required');
        if (!major?.trim()) errors.push('Major is required');
        if (gpa === undefined || gpa === null) errors.push('GPA is required');

        // Validate email format if provided
        if (email?.trim()) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                errors.push('Invalid email format');
            }
        }

        // Validate GPA if provided
        if (gpa !== undefined && gpa !== null) {
            const gpaNum = parseFloat(gpa);
            if (isNaN(gpaNum)) {
                errors.push('GPA must be a number');
            } else if (gpaNum < 0 || gpaNum > 4) {
                errors.push('GPA must be between 0 and 4');
            }
        }

        // Validate date format and future dates
        if (dateOfBirth) {
            const date = new Date(dateOfBirth);
            if (isNaN(date.getTime())) {
                errors.push('Invalid date format for date of birth');
            } else {
                const today = new Date();
                if (date > today) {
                    errors.push('Date of birth cannot be in the future');
                }
            }
        }

        // If there are any validation errors, throw them
        if (errors.length > 0) {
            throw new HttpException(400, errors.join(', '));
        }

        // If everything is valid, convert types as needed
        req.body.gpa = parseFloat(req.body.gpa);
        req.body.dateOfBirth = new Date(req.body.dateOfBirth);

        next();
    } catch (error: any) {
        if (error instanceof HttpException) {
            next(error);
        } else {
            next(new HttpException(400, 'Invalid request data'));
        }
    }
}; 