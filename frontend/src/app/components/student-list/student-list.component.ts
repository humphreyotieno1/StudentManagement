import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="list-container">
        <div class="header-section">
          <h2 class="list-title">Student Details</h2>
          <a href="/new" class="add-button">
            <span class="add-icon">+</span>
            Add New Student
          </a>
        </div>
        
        <div class="table-container">
          <div *ngIf="students.length === 0" class="empty-state">
            <div class="empty-icon">👥</div>
            <h3>No Student Records Found</h3>
            <p>Get started by adding your first student record</p>
            <a href="/new" class="btn btn-primary">Add Student</a>
          </div>

          <div *ngIf="students.length > 0" class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Contact</th>
                  <th>Academic Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let student of students">
                  <td>
                    <div class="student-name">
                      <div class="name">{{ student.firstName }} {{ student.lastName }}</div>
                      <div class="major">{{ student.major }}</div>
                    </div>
                  </td>
                  <td>
                    <div class="contact-info">
                      <div class="email">{{ student.email }}</div>
                      <div class="dob">DOB: {{ student.dateOfBirth | date:'mediumDate' }}</div>
                    </div>
                  </td>
                  <td>
                    <div class="academic-info">
                      <div class="gpa">GPA: {{ student.gpa.toFixed(2) }}</div>
                      <div class="enrollment">Enrolled: {{ student.enrollmentDate | date:'mediumDate' }}</div>
                    </div>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <a [href]="'/edit/' + student._id" class="action-btn edit-btn">
                        <span class="btn-icon">✎</span>
                        Edit
                      </a>
                      <button (click)="deleteStudent(student._id!)" class="action-btn delete-btn">
                        <span class="btn-icon">🗑</span>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .list-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .list-title {
      color: #2c3e50;
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0;
    }

    .add-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: #4299e1;
      color: white;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }

    .add-button:hover {
      background-color: #3182ce;
      transform: translateY(-1px);
    }

    .add-icon {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .table-container {
      margin-top: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      background: #f8fafc;
      border-radius: 8px;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: #718096;
      margin-bottom: 1.5rem;
    }

    .table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    .table th {
      background-color: #f8fafc;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #4a5568;
      border-bottom: 2px solid #e2e8f0;
    }

    .table td {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: middle;
    }

    .student-name {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .name {
      font-weight: 500;
      color: #2c3e50;
    }

    .major {
      font-size: 0.875rem;
      color: #718096;
    }

    .contact-info, .academic-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .email {
      color: #2c3e50;
      font-weight: 500;
    }

    .dob, .enrollment {
      font-size: 0.875rem;
      color: #718096;
    }

    .gpa {
      color: #2c3e50;
      font-weight: 500;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }

    .edit-btn {
      background-color: #ebf8ff;
      color: #3182ce;
    }

    .edit-btn:hover {
      background-color: #bee3f8;
    }

    .delete-btn {
      background-color: #fff5f5;
      color: #e53e3e;
    }

    .delete-btn:hover {
      background-color: #fed7d7;
    }

    .btn-icon {
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .header-section {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .table-responsive {
        overflow-x: auto;
      }

      .action-buttons {
        flex-direction: column;
      }

      .action-btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data: Student[]) => this.students = data,
      error: (error: Error) => console.error('Error loading students:', error)
    });
  }

  deleteStudent(id: string): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.students = this.students.filter(student => student._id !== id);
        },
        error: (error: Error) => console.error('Error deleting student:', error)
      });
    }
  }
} 