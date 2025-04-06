import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseFormComponent, Course } from './course-form.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseFormComponent],
  template: `
    <div class="page-container">
      <h2>Courses</h2>
      
      <div class="actions">
        <button (click)="openAddCourseForm()">Add Course</button>
      </div>
      
      <table *ngIf="!showForm">
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Credits</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let course of courses">
            <td>{{course.courseCode}}</td>
            <td>{{course.title}}</td>
            <td>{{course.credits}}</td>
            <td>{{course.department}}</td>
            <td>
              <button (click)="editCourse(course)">Edit</button>
              <button (click)="deleteCourse(course)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <app-course-form 
        *ngIf="showForm"
        [course]="selectedCourse"
        (save)="saveCourse($event)"
        (cancel)="cancelForm()"
      ></app-course-form>
    </div>
  `,
  styles: [`
    .page-container {
      background: white;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      width: 100%;
      overflow-x: auto;
    }
    
    h2 {
      margin-bottom: 1rem;
    }
    
    .actions {
      margin-bottom: 1rem;
    }
    
    button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 0.5rem;
    }
    
    button:hover {
      background-color: #2980b9;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px; /* Ensure table has minimum width for small screens */
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .page-container {
        padding: 0.75rem;
      }
      
      th, td {
        padding: 0.5rem;
        font-size: 0.9rem;
      }
      
      button {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }
    }
    
    @media (max-width: 480px) {
      .page-container {
        padding: 0.5rem;
      }
      
      h2 {
        font-size: 1.2rem;
      }
      
      th, td {
        padding: 0.4rem;
        font-size: 0.8rem;
      }
      
      button {
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  showForm = false;
  selectedCourse: Course | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        alert('Failed to load courses. Please try again later.');
      }
    });
  }

  openAddCourseForm() {
    this.selectedCourse = null;
    this.showForm = true;
  }

  editCourse(course: Course) {
    this.selectedCourse = { ...course };
    this.showForm = true;
  }

  saveCourse(course: Course) {
    if (this.selectedCourse) {
      // Update existing course
      this.courseService.updateCourse(course).subscribe({
        next: (updatedCourse) => {
          const index = this.courses.findIndex(c => c.courseCode === updatedCourse.courseCode);
          if (index !== -1) {
            this.courses[index] = updatedCourse;
          }
          this.cancelForm();
        },
        error: (error) => {
          console.error('Error updating course:', error);
          alert('Failed to update course. Please try again.');
        }
      });
    } else {
      // Add new course
      this.courseService.createCourse(course).subscribe({
        next: (newCourse) => {
          this.courses.push(newCourse);
          this.cancelForm();
        },
        error: (error) => {
          console.error('Error creating course:', error);
          alert('Failed to create course. Please try again.');
        }
      });
    }
  }

  deleteCourse(course: Course) {
    if (confirm(`Are you sure you want to delete ${course.title}?`)) {
      this.courseService.deleteCourse(course.courseCode).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.courseCode !== course.courseCode);
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          alert('Failed to delete course. Please try again.');
        }
      });
    }
  }
  
  cancelForm() {
    this.showForm = false;
    this.selectedCourse = null;
  }
} 