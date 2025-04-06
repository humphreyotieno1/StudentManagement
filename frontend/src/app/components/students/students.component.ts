import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentFormComponent, Student } from './student-form.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentFormComponent],
  template: `
    <div class="page-container">
      <div class="header">
        <h2>Students</h2>
        <button class="add-button" (click)="openAddStudentForm()">
          <span class="icon">+</span>
          Add Student
        </button>
      </div>
      
      <div *ngIf="loading" class="loading">
        <p>Loading students...</p>
      </div>
      
      <div *ngIf="error" class="error">
        <p>{{error}}</p>
        <button (click)="loadStudents()">Retry</button>
      </div>
      
      <div class="table-container" *ngIf="!showForm && !loading && !error">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Program</th>
              <th>Semester</th>
              <th>Major</th>
              <th>GPA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let student of students">
              <td>{{student.studentId}}</td>
              <td>{{student.firstName}} {{student.lastName}}</td>
              <td>{{student.email}}</td>
              <td>{{student.program}}</td>
              <td>{{student.semester}}</td>
              <td>{{student.major}}</td>
              <td>{{student.gpa}}</td>
              <td>
                <span class="status-badge" [class]="student.status.toLowerCase().replace(' ', '-')">
                  {{student.status}}
                </span>
              </td>
              <td class="actions">
                <button class="icon-button edit" (click)="editStudent(student)" title="Edit">
                  Edit
                </button>
                <button class="icon-button delete" (click)="deleteStudent(student)" title="Delete">
                  Delete
                </button>
              </td>
            </tr>
            <tr *ngIf="students.length === 0">
              <td colspan="9" class="no-data">No students found. Add your first student!</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <app-student-form 
        *ngIf="showForm"
        [student]="selectedStudent"
        (save)="saveStudent($event)"
        (cancel)="cancelForm()"
      ></app-student-form>
    </div>
  `,
  styles: [`
    .page-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }
    
    .add-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .add-button:hover {
      background-color: #2980b9;
    }
    
    .icon {
      font-size: 1.2rem;
      line-height: 1;
    }
    
    .table-container {
      overflow-x: auto;
      margin: 0 -1rem;
      padding: 0 1rem;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 800px;
      background: white;
    }
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #444;
    }
    
    td {
      vertical-align: middle;
    }
    
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.85rem;
      font-weight: 500;
      text-transform: capitalize;
    }
    
    .status-badge.active {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    
    .status-badge.inactive {
      background-color: #fafafa;
      color: #616161;
    }
    
    .status-badge.graduated {
      background-color: #e3f2fd;
      color: #1565c0;
    }
    
    .status-badge.suspended {
      background-color: #ffebee;
      color: #c62828;
    }
    
    .status-badge.on-leave {
      background-color: #fff8e1;
      color: #ff8f00;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }
    
    .icon-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }
    
    .icon-button.edit {
      background-color: #e9ecef;
      color: #495057;
    }
    
    .icon-button.edit:hover {
      background-color: #dee2e6;
    }
    
    .icon-button.delete {
      background-color: #fee2e2;
      color: #dc2626;
    }
    
    .icon-button.delete:hover {
      background-color: #fecaca;
    }
    
    .loading, .error, .no-data {
      padding: 2rem;
      text-align: center;
      color: #666;
    }
    
    .error {
      color: #e74c3c;
    }
    
    .no-data {
      font-style: italic;
      background: #f8f9fa;
      border-radius: 6px;
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .page-container {
        padding: 1.5rem;
      }
      
      .header {
        margin-bottom: 1.5rem;
      }
      
      h2 {
        font-size: 1.25rem;
      }
      
      .add-button {
        padding: 0.6rem 1.2rem;
        font-size: 0.95rem;
      }
      
      th, td {
        padding: 0.75rem;
      }
    }
  `]
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  showForm = false;
  selectedStudent: Student | null = null;
  loading = false;
  error: string | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.error = null;
    
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.error = 'Failed to load students. Please try again later.';
        this.loading = false;
      }
    });
  }

  openAddStudentForm() {
    this.selectedStudent = null;
    this.showForm = true;
  }

  editStudent(student: Student) {
    this.selectedStudent = { ...student };
    this.showForm = true;
  }

  saveStudent(student: Student) {
    if (this.selectedStudent) {
      // Update existing student
      this.studentService.updateStudent(student.studentId, student).subscribe({
        next: (updatedStudent) => {
          const index = this.students.findIndex(s => s.studentId === updatedStudent.studentId);
          if (index !== -1) {
            this.students[index] = updatedStudent;
          }
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error updating student:', error);
          alert(error.message);
        }
      });
    } else {
      // Create new student
      this.studentService.createStudent(student).subscribe({
        next: (newStudent) => {
          this.students.push(newStudent);
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error creating student:', error);
          alert(error.message);
        }
      });
    }
  }

  deleteStudent(student: Student) {
    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      this.studentService.deleteStudent(student.studentId).subscribe({
        next: () => {
          this.students = this.students.filter(s => s.studentId !== student.studentId);
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student. Please try again later.');
        }
      });
    }
  }

  cancelForm() {
    this.showForm = false;
  }
} 