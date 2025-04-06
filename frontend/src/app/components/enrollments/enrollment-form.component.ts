import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../students/student-form.component';

export interface SimpleStudent {
  studentId: string;
  name: string;
}

export interface Course {
  courseCode: string;
  title: string;
}

export interface Enrollment {
  studentId: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
  enrollmentDate: Date;
}

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h3>Add Enrollment</h3>
      
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="studentId">Student</label>
          <select 
            id="studentId" 
            name="studentId" 
            [(ngModel)]="formData.studentId" 
            (ngModelChange)="onStudentChange($event)"
            required
          >
            <option value="">Select a student</option>
            <option *ngFor="let student of students" [value]="student.studentId">
              {{student.name}} ({{student.studentId}})
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="courseCode">Course</label>
          <select 
            id="courseCode" 
            name="courseCode" 
            [(ngModel)]="formData.courseCode" 
            (ngModelChange)="onCourseChange($event)"
            required
          >
            <option value="">Select a course</option>
            <option *ngFor="let course of courses" [value]="course.courseCode">
              {{course.title}} ({{course.courseCode}})
            </option>
          </select>
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
          >
        </div>
        
        <div class="form-actions">
          <button type="button" (click)="onCancel()">Cancel</button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      background: white;
      padding: 1.5rem;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      margin: 0 auto;
      width: 100%;
    }
    
    h3 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    input, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }
    
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      margin-left: 0.5rem;
    }
    
    button[type="button"] {
      background-color: #f5f5f5;
      color: #333;
    }
    
    button[type="submit"] {
      background-color: #3498db;
      color: white;
    }
    
    button:hover {
      opacity: 0.9;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .form-container {
        padding: 1.25rem;
      }
      
      h3 {
        font-size: 1.2rem;
        margin-bottom: 1.25rem;
      }
      
      input, select, button {
        font-size: 0.9rem;
      }
    }
    
    @media (max-width: 480px) {
      .form-container {
        padding: 1rem;
      }
      
      h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }
      
      .form-group {
        margin-bottom: 0.75rem;
      }
      
      label {
        font-size: 0.9rem;
      }
      
      input, select, button {
        font-size: 0.85rem;
        padding: 0.4rem;
      }
      
      .form-actions {
        margin-top: 1.25rem;
      }
    }
  `]
})
export class EnrollmentFormComponent implements OnInit {
  @Input() students: SimpleStudent[] = [];
  @Input() courses: Course[] = [];
  @Output() save = new EventEmitter<Enrollment>();
  @Output() cancel = new EventEmitter<void>();
  
  formData: Enrollment = {
    studentId: '',
    studentName: '',
    courseCode: '',
    courseTitle: '',
    enrollmentDate: new Date()
  };
  
  constructor() {}
  
  ngOnInit() {}
  
  onStudentChange(studentId: string) {
    const student = this.students.find(s => s.studentId === studentId);
    if (student) {
      this.formData.studentName = student.name;
    }
  }
  
  onCourseChange(courseCode: string) {
    const course = this.courses.find(c => c.courseCode === courseCode);
    if (course) {
      this.formData.courseTitle = course.title;
    }
  }
  
  onSubmit() {
    this.save.emit(this.formData);
  }
  
  onCancel() {
    this.cancel.emit();
  }
} 