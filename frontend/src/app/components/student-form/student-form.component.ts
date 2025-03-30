import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="form-container">
        <h2 class="form-title">{{ isEditMode ? 'Edit' : 'Add' }} Student Details</h2>
        
        <div *ngIf="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="needs-validation">
          <div class="form-grid">
            <!-- Left Column -->
            <div class="form-column">
              <div class="form-group">
                <label for="firstName" class="form-label">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  formControlName="firstName"
                  [class.is-invalid]="isFieldInvalid('firstName')"
                  placeholder="Enter first name"
                >
                <div class="invalid-feedback" *ngIf="isFieldInvalid('firstName')">
                  {{ getFieldErrorMessage('firstName') }}
                </div>
              </div>

              <div class="form-group">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  formControlName="lastName"
                  [class.is-invalid]="isFieldInvalid('lastName')"
                  placeholder="Enter last name"
                >
                <div class="invalid-feedback" *ngIf="isFieldInvalid('lastName')">
                  {{ getFieldErrorMessage('lastName') }}
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  formControlName="email"
                  [class.is-invalid]="isFieldInvalid('email')"
                  placeholder="Enter email address"
                >
                <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
                  {{ getFieldErrorMessage('email') }}
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="form-column">
              <div class="form-group">
                <label for="dateOfBirth" class="form-label">Date of Birth</label>
                <input
                  type="date"
                  class="form-control"
                  id="dateOfBirth"
                  formControlName="dateOfBirth"
                  [class.is-invalid]="isFieldInvalid('dateOfBirth')"
                  [max]="today"
                >
                <div class="invalid-feedback" *ngIf="isFieldInvalid('dateOfBirth')">
                  {{ getFieldErrorMessage('dateOfBirth') }}
                </div>
              </div>

              <div class="form-group">
                <label for="major" class="form-label">Major</label>
                <input
                  type="text"
                  class="form-control"
                  id="major"
                  formControlName="major"
                  [class.is-invalid]="isFieldInvalid('major')"
                  placeholder="Enter major"
                >
                <div class="invalid-feedback" *ngIf="isFieldInvalid('major')">
                  {{ getFieldErrorMessage('major') }}
                </div>
              </div>

              <div class="form-group">
                <label for="gpa" class="form-label">GPA</label>
                <input
                  type="number"
                  class="form-control"
                  id="gpa"
                  formControlName="gpa"
                  step="0.01"
                  min="0"
                  max="4"
                  [class.is-invalid]="isFieldInvalid('gpa')"
                  placeholder="Enter GPA"
                >
                <div class="invalid-feedback" *ngIf="isFieldInvalid('gpa')">
                  {{ getFieldErrorMessage('gpa') }}
                </div>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="studentForm.invalid || isSubmitting">
              {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }}
            </button>
            <a href="/list" class="btn btn-secondary">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .form-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-title {
      color: #2c3e50;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .form-column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-weight: 500;
      color: #4a5568;
      margin-bottom: 0.25rem;
    }

    .form-control {
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-control:focus {
      border-color: #4299e1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
      outline: none;
    }

    .form-control.is-invalid {
      border-color: #e53e3e;
    }

    .invalid-feedback {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-primary {
      background-color: #4299e1;
      border-color: #4299e1;
      color: white;
    }

    .btn-primary:hover {
      background-color: #3182ce;
      border-color: #3182ce;
    }

    .btn-secondary {
      background-color: #718096;
      border-color: #718096;
      color: white;
      text-decoration: none;
    }

    .btn-secondary:hover {
      background-color: #4a5568;
      border-color: #4a5568;
    }

    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .form-container {
        padding: 1rem;
      }
    }
  `]
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      dateOfBirth: ['', [Validators.required]],
      major: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      gpa: ['', [Validators.required, Validators.min(0), Validators.max(4), Validators.pattern(/^\d*\.?\d+$/)]]
    });
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.isEditMode = true;
      this.loadStudent();
    }
  }

  loadStudent(): void {
    if (this.studentId) {
      this.studentService.getStudent(this.studentId).subscribe({
        next: (student: Student) => {
          // Format date to YYYY-MM-DD for input
          const dateOfBirth = new Date(student.dateOfBirth)
            .toISOString()
            .split('T')[0];
          
          this.studentForm.patchValue({
            ...student,
            dateOfBirth
          });
        },
        error: (error) => {
          console.error('Error loading student:', error);
          this.errorMessage = 'Error loading student details';
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.studentForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }

    if (field.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least 2 characters`;
    }

    if (field.hasError('email')) {
      return 'Please enter a valid email address';
    }

    if (field.hasError('pattern')) {
      switch (fieldName) {
        case 'firstName':
        case 'lastName':
        case 'major':
          return 'Only letters and spaces are allowed';
        case 'email':
          return 'Please enter a valid email address';
        case 'gpa':
          return 'Please enter a valid number';
        default:
          return 'Invalid format';
      }
    }

    if (field.hasError('min')) {
      return 'GPA cannot be less than 0';
    }

    if (field.hasError('max')) {
      return 'GPA cannot be more than 4';
    }

    return '';
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;
      
      const formData = this.studentForm.value;
      
      // Format the data according to the backend requirements
      const studentData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        dateOfBirth: new Date(formData.dateOfBirth),
        major: formData.major.trim(),
        gpa: parseFloat(formData.gpa),
        enrollmentDate: new Date() // Set current date as enrollment date
      };
      
      console.log('Submitting student data:', studentData);

      const observable = this.isEditMode && this.studentId
        ? this.studentService.updateStudent(this.studentId, studentData)
        : this.studentService.createStudent(studentData);

      observable.subscribe({
        next: () => {
          window.location.href = '/list';
        },
        error: (error) => {
          console.error('Error submitting student:', error);
          this.errorMessage = error.message || 'Error saving student';
          this.isSubmitting = false;
          
          // Mark all fields as touched to show validation errors
          Object.keys(this.studentForm.controls).forEach(key => {
            const control = this.studentForm.get(key);
            control?.markAsTouched();
          });
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        control?.markAsTouched();
      });
    }
  }
} 