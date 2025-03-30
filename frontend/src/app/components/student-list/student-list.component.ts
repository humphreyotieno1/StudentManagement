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
      <h2>Student List</h2>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Major</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let student of students">
              <td>{{ student.firstName }} {{ student.lastName }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.major }}</td>
              <td>{{ student.gpa.toFixed(2) }}</td>
              <td>
                <a [href]="'/edit/' + student._id" class="btn btn-sm btn-primary me-2">Edit</a>
                <button (click)="deleteStudent(student._id!)" class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr *ngIf="students.length === 0">
              <td colspan="5" class="text-center">No students found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; }
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