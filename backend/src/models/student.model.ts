import { Schema, model } from 'mongoose';
import { IStudent } from '../types/student.types';

const studentSchema = new Schema<IStudent>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function(value: Date) {
                return value instanceof Date && !isNaN(value.getTime());
            },
            message: 'Please enter a valid date'
        }
    },
    major: {
        type: String,
        required: [true, 'Major is required'],
        trim: true,
        minlength: [2, 'Major must be at least 2 characters']
    },
    gpa: {
        type: Number,
        required: [true, 'GPA is required'],
        min: [0, 'GPA cannot be less than 0'],
        max: [4, 'GPA cannot be more than 4'],
        validate: {
            validator: function(value: number) {
                return !isNaN(value) && value >= 0 && value <= 4;
            },
            message: 'GPA must be a number between 0 and 4'
        }
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function(value: Date) {
                return value instanceof Date && !isNaN(value.getTime());
            },
            message: 'Please enter a valid enrollment date'
        }
    }
}, {
    timestamps: true,
    versionKey: false
});

// Create indexes
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ lastName: 1, firstName: 1 });

// Export the model
export const Student = model<IStudent>('Student', studentSchema);