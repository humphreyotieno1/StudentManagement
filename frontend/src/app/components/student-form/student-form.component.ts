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
import { MatDividerModule } from '@angular/material/divider';
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
    MatDividerModule,
    RouterModule
  ],
  template: `
    <div class="form-container">
      <div class="form-header">
        <h2>{{ studentId ? 'Edit' : 'Add' }} Student</h2>
        <p class="text-secondary">{{ studentId ? 'Update student information' : 'Create a new student record' }}</p>
      </div>

      <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
        <div class="form-section">
          <h3>Personal Information</h3>
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Student ID</mat-label>
              <input matInput formControlName="studentId" placeholder="Enter student ID">
              <mat-error *ngIf="studentForm.get('studentId')?.hasError('required')">
                Student ID is required
              </mat-error>
              <mat-error *ngIf="studentForm.get('studentId')?.hasError('pattern')">
                Student ID must be 10 characters (uppercase letters and numbers)
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
              <mat-error *ngIf="studentForm.get('email')?.hasError('pattern')">
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
        </div>

        <mat-divider class="my-4"></mat-divider>

        <div class="form-section">
          <h3>Address Information</h3>
          <div class="form-grid" formGroupName="address">
            <mat-form-field appearance="outline">
              <mat-label>Street</mat-label>
              <input matInput formControlName="street" placeholder="Enter street address">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>City</mat-label>
              <input matInput formControlName="city" placeholder="Enter city">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>State</mat-label>
              <input matInput formControlName="state" placeholder="Enter state">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Zip Code</mat-label>
              <input matInput formControlName="zipCode" placeholder="Enter zip code">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Country</mat-label>
              <input matInput formControlName="country" placeholder="Enter country">
            </mat-form-field>
          </div>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <div class="form-section">
          <h3>Emergency Contact</h3>
          <div class="form-grid" formGroupName="emergencyContact">
            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter contact name">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Relationship</mat-label>
              <input matInput formControlName="relationship" placeholder="Enter relationship">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" placeholder="Enter contact phone">
            </mat-form-field>
          </div>
        </div>

        <mat-divider class="my-4"></mat-divider>

        <div class="form-section">
          <h3>Academic Information</h3>
          <div class="form-grid">
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
              <mat-label>Last Semester GPA</mat-label>
              <input matInput type="number" formControlName="lastSemesterGPA" placeholder="Enter last semester GPA">
              <mat-error *ngIf="studentForm.get('lastSemesterGPA')?.hasError('min')">
                GPA must be at least 0
              </mat-error>
              <mat-error *ngIf="studentForm.get('lastSemesterGPA')?.hasError('max')">
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
                <mat-option value="On Leave">On Leave</mat-option>
              </mat-select>
              <mat-error *ngIf="studentForm.get('status')?.hasError('required')">
                Status is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Academic Standing</mat-label>
              <mat-select formControlName="academicStanding">
                <mat-option value="Good Standing">Good Standing</mat-option>
                <mat-option value="Academic Warning">Academic Warning</mat-option>
                <mat-option value="Academic Probation">Academic Probation</mat-option>
                <mat-option value="Academic Suspension">Academic Suspension</mat-option>
              </mat-select>
              <mat-error *ngIf="studentForm.get('academicStanding')?.hasError('required')">
                Academic standing is required
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

            <mat-form-field appearance="outline">
              <mat-label>Expected Graduation Date</mat-label>
              <input matInput [matDatepicker]="gradPicker" formControlName="expectedGraduationDate">
              <mat-datepicker-toggle matIconSuffix [for]="gradPicker"></mat-datepicker-toggle>
              <mat-datepicker #gradPicker></mat-datepicker>
            </mat-form-field>
          </div>
        </div>

        <div class="form-actions">
          <button mat-button type="button" routerLink="/students" class="btn-secondary">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="studentForm.invalid" class="btn-primary">
            {{ studentId ? 'Update' : 'Create' }} Student
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 1000px;
      margin: 0 auto;
    }

    .form-header {
      margin-bottom: var(--spacing-lg);
    }

    .form-header h2 {
      margin-bottom: var(--spacing-xs);
    }

    .text-secondary {
      color: var(--text-secondary);
      margin-bottom: 0;
    }

    .form-section {
      margin-bottom: var(--spacing-lg);
    }

    .form-section h3 {
      margin-bottom: var(--spacing-md);
      font-size: 1.125rem;
      font-weight: 500;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-md);
    }

    .my-4 {
      margin: var(--spacing-xl) 0;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-md);
      margin-top: var(--spacing-xl);
    }

    mat-form-field {
      width: 100%;
    }

    @media (max-width: 768px) {
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
  ) {}

  ngOnInit() {
    this.initForm();
    
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.loadStudentData();
    }
  }

  private initForm() {
    this.studentForm = this.fb.group({
      studentId: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{10}$')]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      dateOfBirth: ['', Validators.required],
      contactNumber: ['', Validators.pattern('^[0-9]{10,15}$')],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        country: ['']
      }),
      emergencyContact: this.fb.group({
        name: [''],
        relationship: [''],
        phone: ['']
      }),
      major: ['', [Validators.required, Validators.minLength(2)]],
      gpa: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
      lastSemesterGPA: ['', [Validators.min(0), Validators.max(4)]],
      program: ['', Validators.required],
      semester: ['', Validators.required],
      status: ['Active', Validators.required],
      academicStanding: ['Good Standing', Validators.required],
      enrollmentDate: ['', Validators.required],
      expectedGraduationDate: ['']
    });
  }

  private loadStudentData() {
    if (this.studentId) {
      this.studentService.getStudent(this.studentId).subscribe({
        next: (student) => {
          this.studentForm.patchValue(student);
        },
        error: (error) => {
          this.snackBar.open('Error loading student data', 'Close', { duration: 3000 });
          console.error('Error loading student:', error);
          this.router.navigate(['/students']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      
      const operation = this.studentId
        ? this.studentService.updateStudent(this.studentId, studentData)
        : this.studentService.createStudent(studentData);

      operation.subscribe({
        next: () => {
          this.snackBar.open(
            `Student successfully ${this.studentId ? 'updated' : 'created'}`,
            'Close',
            { duration: 3000 }
          );
          this.router.navigate(['/students']);
        },
        error: (error) => {
          this.snackBar.open('Error saving student data', 'Close', { duration: 3000 });
          console.error('Error saving student:', error);
        }
      });
    }
  }
} 