import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule
  ],
  template: `
      <div class="form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ studentId ? 'Edit' : 'Add' }} Student</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
              <!-- Personal Information -->
              <div class="form-section">
                <h3>Personal Information</h3>
                <mat-form-field appearance="outline">
                  <mat-label>Student ID</mat-label>
                  <input matInput formControlName="studentId" placeholder="Enter student ID">
                  <mat-error *ngIf="studentForm.get('studentId')?.hasError('required')">
                    Student ID is required
                  </mat-error>
                  <mat-error *ngIf="studentForm.get('studentId')?.hasError('pattern')">
                    Student ID must be 8 characters (uppercase letters and numbers)
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>First Name</mat-label>
                  <input matInput formControlName="firstName" placeholder="Enter first name">
                  <mat-error *ngIf="studentForm.get('firstName')?.hasError('required')">
                    First name is required
                  </mat-error>
                  <mat-error *ngIf="studentForm.get('firstName')?.hasError('minlength')">
                    First name must be at least 2 characters
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Last Name</mat-label>
                  <input matInput formControlName="lastName" placeholder="Enter last name">
                  <mat-error *ngIf="studentForm.get('lastName')?.hasError('required')">
                    Last name is required
                  </mat-error>
                  <mat-error *ngIf="studentForm.get('lastName')?.hasError('minlength')">
                    Last name must be at least 2 characters
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" type="email" placeholder="Enter email">
                  <mat-error *ngIf="studentForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="studentForm.get('email')?.hasError('email')">
                    Please enter a valid email
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Date of Birth</mat-label>
                  <input matInput [matDatepicker]="dobPicker" formControlName="dateOfBirth">
                  <mat-datepicker-toggle matIconSuffix [for]="dobPicker"></mat-datepicker-toggle>
                  <mat-datepicker #dobPicker></mat-datepicker>
                  <mat-error *ngIf="studentForm.get('dateOfBirth')?.hasError('required')">
                    Date of birth is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Contact Number</mat-label>
                  <input matInput formControlName="contactNumber" placeholder="Enter contact number">
                  <mat-error *ngIf="studentForm.get('contactNumber')?.hasError('pattern')">
                    Please enter a valid phone number
                  </mat-error>
                </mat-form-field>
              </div>

              <!-- Academic Information -->
              <div class="form-section">
                <h3>Academic Information</h3>
                <mat-form-field appearance="outline">
                  <mat-label>Major</mat-label>
                  <input matInput formControlName="major" placeholder="Enter major">
                  <mat-error *ngIf="studentForm.get('major')?.hasError('required')">
                    Major is required
                  </mat-error>
                  <mat-error *ngIf="studentForm.get('major')?.hasError('minlength')">
                    Major must be at least 2 characters
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>GPA</mat-label>
                  <input matInput type="number" formControlName="gpa" placeholder="Enter GPA">
                  <mat-error *ngIf="studentForm.get('gpa')?.hasError('required')">
                    GPA is required
                  </mat-error>
                  <mat-error *ngIf="studentForm.get('gpa')?.hasError('min')">
                    GPA must be at least 0
                  </mat-error>
                  <mat-error *ngIf="studentForm.get('gpa')?.hasError('max')">
                    GPA cannot exceed 4
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Program</mat-label>
                  <input matInput formControlName="program" placeholder="Enter program">
                  <mat-error *ngIf="studentForm.get('program')?.hasError('required')">
                    Program is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Semester</mat-label>
                  <input matInput formControlName="semester" placeholder="Enter semester">
                  <mat-error *ngIf="studentForm.get('semester')?.hasError('required')">
                    Semester is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Status</mat-label>
                  <mat-select formControlName="status">
                    <mat-option value="Active">Active</mat-option>
                    <mat-option value="Inactive">Inactive</mat-option>
                    <mat-option value="Graduated">Graduated</mat-option>
                    <mat-option value="Suspended">Suspended</mat-option>
                  </mat-select>
                  <mat-error *ngIf="studentForm.get('status')?.hasError('required')">
                    Status is required
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Enrollment Date</mat-label>
                  <input matInput [matDatepicker]="enrollmentPicker" formControlName="enrollmentDate">
                  <mat-datepicker-toggle matIconSuffix [for]="enrollmentPicker"></mat-datepicker-toggle>
                  <mat-datepicker #enrollmentPicker></mat-datepicker>
                  <mat-error *ngIf="studentForm.get('enrollmentDate')?.hasError('required')">
                    Enrollment date is required
                  </mat-error>
                </mat-form-field>
            </div>
          </div>

          <div class="form-actions">
              <button mat-button type="button" routerLink="/students">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="studentForm.invalid">
                {{ studentId ? 'Update' : 'Create' }} Student
            </button>
          </div>
        </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 20px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-section h3 {
      margin: 0 0 16px;
      color: #666;
      font-size: 1.1rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }

    mat-form-field {
      width: 100%;
    }

    @media (max-width: 600px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  studentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.loadStudent();
    }
  }

  private initForm(): void {
    this.studentForm = this.fb.group({
      studentId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{8}$/)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [null, Validators.required],
      major: ['', [Validators.required, Validators.minLength(2)]],
      gpa: [0, [Validators.required, Validators.min(0), Validators.max(4)]],
      contactNumber: ['', [Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      program: ['', Validators.required],
      semester: ['', Validators.required],
      status: ['Active', Validators.required],
      enrollmentDate: [new Date(), Validators.required]
    });
  }

  private loadStudent(): void {
    this.studentService.getStudent(this.studentId!).subscribe({
        next: (student: Student) => {
          this.studentForm.patchValue({
            ...student,
          dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth) : null,
          enrollmentDate: student.enrollmentDate ? new Date(student.enrollmentDate) : null
          });
        },
      error: (error: any) => {
        this.snackBar.open('Error loading student', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.router.navigate(['/students']);
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      
      // Create a new student object with proper date handling
      const studentData: Student = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
        enrollmentDate: formData.enrollmentDate ? new Date(formData.enrollmentDate).toISOString() : new Date().toISOString(),
        gpa: Number(formData.gpa),
        contactNumber: formData.contactNumber || undefined
      };

      const request$ = this.studentId
        ? this.studentService.updateStudent(this.studentId, studentData)
        : this.studentService.createStudent(studentData);

      request$.subscribe({
        next: () => {
          this.snackBar.open(
            `Student ${this.studentId ? 'updated' : 'created'} successfully`,
            'Close',
            { duration: 3000, panelClass: ['success-snackbar'] }
          );
          this.router.navigate(['/students']);
        },
        error: (error: any) => {
          console.error('Error saving student:', error);
          this.snackBar.open(
            error.message || 'An error occurred while saving the student',
            'Close',
            { duration: 3000, panelClass: ['error-snackbar'] }
          );
        }
      });
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
} 