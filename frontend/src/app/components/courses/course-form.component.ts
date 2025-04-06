import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Course {
  courseCode: string;
  title: string;
  credits: number;
  department: string;
}

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h3>{{course ? 'Edit Course' : 'Add Course'}}</h3>
      
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="courseCode">Course Code</label>
          <input 
            type="text" 
            id="courseCode" 
            name="courseCode" 
            [(ngModel)]="formData.courseCode" 
            required
            [disabled]="!!course"
          >
        </div>
        
        <div class="form-group">
          <label for="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            [(ngModel)]="formData.title" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="credits">Credits</label>
          <input 
            type="number" 
            id="credits" 
            name="credits" 
            [(ngModel)]="formData.credits" 
            required
            min="1"
            max="6"
          >
        </div>
        
        <div class="form-group">
          <label for="department">Department</label>
          <input 
            type="text" 
            id="department" 
            name="department" 
            [(ngModel)]="formData.department" 
            required
          >
        </div>
        
        <div class="form-actions">
          <button type="button" (click)="onCancel()">Cancel</button>
          <button type="submit">{{course ? 'Update' : 'Add'}}</button>
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
    
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    input:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
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
      
      input, button {
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
      
      input, button {
        font-size: 0.85rem;
        padding: 0.4rem;
      }
      
      .form-actions {
        margin-top: 1.25rem;
      }
    }
  `]
})
export class CourseFormComponent implements OnInit {
  @Input() course: Course | null = null;
  @Output() save = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter<void>();
  
  formData: Course = {
    courseCode: '',
    title: '',
    credits: 3,
    department: ''
  };
  
  constructor() {}
  
  ngOnInit() {
    if (this.course) {
      this.formData = { ...this.course };
    }
  }
  
  onSubmit() {
    this.save.emit(this.formData);
  }
  
  onCancel() {
    this.cancel.emit();
  }
} 