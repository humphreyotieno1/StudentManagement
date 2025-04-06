import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentFormComponent, Enrollment, Course, SimpleStudent } from './enrollment-form.component';
import { Student } from '../students/student-form.component';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule, FormsModule, EnrollmentFormComponent],
  template: `
    <div class="page-container">
      <h2>Enrollments</h2>
      
      <div class="actions">
        <button (click)="openAddEnrollmentForm()">Add Enrollment</button>
      </div>
      
      <table *ngIf="!showForm">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Enrollment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let enrollment of enrollments">
            <td>{{enrollment.studentId}}</td>
            <td>{{enrollment.studentName}}</td>
            <td>{{enrollment.courseCode}}</td>
            <td>{{enrollment.courseTitle}}</td>
            <td>{{enrollment.enrollmentDate | date:'shortDate'}}</td>
            <td>
              <button (click)="deleteEnrollment(enrollment)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <app-enrollment-form 
        *ngIf="showForm"
        [students]="students"
        [courses]="courses"
        (save)="saveEnrollment($event)"
        (cancel)="cancelForm()"
      ></app-enrollment-form>
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
export class EnrollmentsComponent implements OnInit {
  enrollments: Enrollment[] = [];
  students: SimpleStudent[] = [];
  courses: Course[] = [];
  showForm = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadEnrollments();
    this.loadStudents();
    this.loadCourses();
  }

  loadEnrollments() {
    this.enrollmentService.getEnrollments().subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
      },
      error: (error) => {
        console.error('Error loading enrollments:', error);
        alert('Failed to load enrollments. Please try again later.');
      }
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students.map(s => ({ studentId: s.studentId, name: s.name }));
      },
      error: (error) => {
        console.error('Error loading students:', error);
        alert('Failed to load students. Please try again later.');
      }
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses.map(c => ({ courseCode: c.courseCode, title: c.title }));
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        alert('Failed to load courses. Please try again later.');
      }
    });
  }

  openAddEnrollmentForm() {
    this.showForm = true;
  }

  saveEnrollment(enrollment: Enrollment) {
    // Check if enrollment already exists
    const exists = this.enrollments.some(e => 
      e.studentId === enrollment.studentId && e.courseCode === enrollment.courseCode
    );
    
    if (exists) {
      alert('This student is already enrolled in this course.');
      return;
    }
    
    // Add new enrollment
    this.enrollmentService.createEnrollment(enrollment).subscribe({
      next: (newEnrollment) => {
        this.enrollments.push(newEnrollment);
        this.cancelForm();
      },
      error: (error) => {
        console.error('Error creating enrollment:', error);
        alert('Failed to create enrollment. Please try again.');
      }
    });
  }

  deleteEnrollment(enrollment: Enrollment) {
    if (confirm(`Are you sure you want to delete this enrollment?`)) {
      this.enrollmentService.deleteEnrollment(enrollment.studentId, enrollment.courseCode).subscribe({
        next: () => {
          this.enrollments = this.enrollments.filter(e => 
            e.studentId !== enrollment.studentId || e.courseCode !== enrollment.courseCode
          );
        },
        error: (error) => {
          console.error('Error deleting enrollment:', error);
          alert('Failed to delete enrollment. Please try again.');
        }
      });
    }
  }
  
  cancelForm() {
    this.showForm = false;
  }
} 