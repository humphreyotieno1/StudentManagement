import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  program: string;
  semester: string;
  major: string;
  gpa: number;
  enrollmentDate: Date;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended' | 'On Leave';
}

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h3>{{student ? 'Edit Student' : 'Add Student'}}</h3>
      
      <form (ngSubmit)="onSubmit()" #studentForm="ngForm">
        <div class="form-grid">
          <div class="form-group">
            <label for="studentId">Student ID</label>
            <input 
              type="text" 
              id="studentId" 
              name="studentId" 
              [(ngModel)]="formData.studentId" 
              required
              pattern="^[A-Z0-9]{10}$"
              [disabled]="!!student"
              #studentId="ngModel"
            >
            <div class="error-message" *ngIf="studentId.invalid && (studentId.dirty || studentId.touched)">
              <span *ngIf="studentId.errors?.['required']">Student ID is required</span>
              <span *ngIf="studentId.errors?.['pattern']">Student ID must be 10 characters (uppercase letters and numbers)</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="formData.email" 
              required
              email
              #email="ngModel"
            >
            <div class="error-message" *ngIf="email.invalid && (email.dirty || email.touched)">
              <span *ngIf="email.errors?.['required']">Email is required</span>
              <span *ngIf="email.errors?.['email']">Please enter a valid email address</span>
            </div>
          </div>

          <div class="form-group">
            <label for="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              [(ngModel)]="formData.firstName" 
              required
              #firstName="ngModel"
            >
            <div class="error-message" *ngIf="firstName.invalid && (firstName.dirty || firstName.touched)">
              First name is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              [(ngModel)]="formData.lastName" 
              required
              #lastName="ngModel"
            >
            <div class="error-message" *ngIf="lastName.invalid && (lastName.dirty || lastName.touched)">
              Last name is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="dateOfBirth">Date of Birth</label>
            <input 
              type="date" 
              id="dateOfBirth" 
              name="dateOfBirth" 
              [ngModel]="formData.dateOfBirth | date:'yyyy-MM-dd'"
              (ngModelChange)="formData.dateOfBirth = $event"
              required
              #dateOfBirth="ngModel"
            >
            <div class="error-message" *ngIf="dateOfBirth.invalid && (dateOfBirth.dirty || dateOfBirth.touched)">
              Date of birth is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="program">Program</label>
            <input 
              type="text" 
              id="program" 
              name="program" 
              [(ngModel)]="formData.program" 
              required
              #program="ngModel"
            >
            <div class="error-message" *ngIf="program.invalid && (program.dirty || program.touched)">
              Program is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="semester">Semester</label>
            <input 
              type="text" 
              id="semester" 
              name="semester" 
              [(ngModel)]="formData.semester" 
              required
              #semester="ngModel"
            >
            <div class="error-message" *ngIf="semester.invalid && (semester.dirty || semester.touched)">
              Semester is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="major">Major</label>
            <input 
              type="text" 
              id="major" 
              name="major" 
              [(ngModel)]="formData.major" 
              required
              #major="ngModel"
            >
            <div class="error-message" *ngIf="major.invalid && (major.dirty || major.touched)">
              Major is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="gpa">GPA</label>
            <input 
              type="number" 
              id="gpa" 
              name="gpa" 
              [(ngModel)]="formData.gpa" 
              required
              min="0"
              max="4"
              step="0.01"
              #gpa="ngModel"
            >
            <div class="error-message" *ngIf="gpa.invalid && (gpa.dirty || gpa.touched)">
              <span *ngIf="gpa.errors?.['required']">GPA is required</span>
              <span *ngIf="gpa.errors?.['min'] || gpa.errors?.['max']">GPA must be between 0 and 4</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="enrollmentDate">Enrollment Date</label>
            <input 
              type="date" 
              id="enrollmentDate" 
              name="enrollmentDate" 
              [ngModel]="formData.enrollmentDate | date:'yyyy-MM-dd'"
              (ngModelChange)="formData.enrollmentDate = $event"
              required
              #enrollmentDate="ngModel"
            >
            <div class="error-message" *ngIf="enrollmentDate.invalid && (enrollmentDate.dirty || enrollmentDate.touched)">
              Enrollment date is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="status">Status</label>
            <select 
              id="status" 
              name="status" 
              [(ngModel)]="formData.status" 
              required
              #status="ngModel"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
              <option value="Suspended">Suspended</option>
              <option value="On Leave">On Leave</option>
            </select>
            <div class="error-message" *ngIf="status.invalid && (status.dirty || status.touched)">
              Status is required
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-button" (click)="onCancel()">Cancel</button>
          <button type="submit" class="save-button" [disabled]="!studentForm.form.valid">Save</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 0 auto;
    }
    
    h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #333;
      font-size: 1.5rem;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    label {
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }
    
    input, select {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s ease;
    }
    
    input:focus, select:focus {
      border-color: #3498db;
      outline: none;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .cancel-button {
      background-color: #f8f9fa;
      color: #495057;
    }
    
    .cancel-button:hover {
      background-color: #e9ecef;
    }
    
    .save-button {
      background-color: #3498db;
      color: white;
    }
    
    .save-button:hover {
      background-color: #2980b9;
    }
    
    .save-button:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .form-container {
        padding: 1.5rem;
      }
      
      .form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      
      input, select, button {
        font-size: 0.95rem;
      }
    }
  `]
})
export class StudentFormComponent implements OnInit {
  @Input() student: Student | null = null;
  @Output() save = new EventEmitter<Student>();
  @Output() cancel = new EventEmitter<void>();
  
  formData: Student = {
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date(),
    program: '',
    semester: '',
    major: '',
    gpa: 0,
    enrollmentDate: new Date(),
    status: 'Active'
  };
  
  constructor() {}
  
  ngOnInit() {
    if (this.student) {
      this.formData = { ...this.student };
    }
  }
  
  onSubmit() {
    if (this.formData.studentId && 
        this.formData.firstName && 
        this.formData.lastName && 
        this.formData.email && 
        this.formData.dateOfBirth && 
        this.formData.program &&
        this.formData.semester &&
        this.formData.major && 
        this.formData.gpa && 
        this.formData.enrollmentDate) {
      this.save.emit(this.formData);
    }
  }
  
  onCancel() {
    this.cancel.emit();
  }
} 