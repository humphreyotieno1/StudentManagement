import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
    <div class="list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Student Records</mat-card-title>
          <div class="spacer"></div>
          <button mat-raised-button color="primary" routerLink="/students/new">
            <mat-icon>add</mat-icon>
            Add New Student
          </button>
        </mat-card-header>

        <mat-card-content>
          <div *ngIf="students.length === 0" class="empty-state">
            <mat-icon class="empty-icon">school</mat-icon>
            <h3>No Student Records Found</h3>
            <p>Get started by adding your first student record</p>
            <button mat-raised-button color="primary" routerLink="/students/new">
              Add Student
            </button>
          </div>

          <div *ngIf="students.length > 0" class="table-container">
            <table mat-table [dataSource]="students" class="mat-elevation-z8">
              <!-- Student ID Column -->
              <ng-container matColumnDef="studentId">
                <th mat-header-cell *matHeaderCellDef>Student ID</th>
                <td mat-cell *matCellDef="let student">{{ student.studentId }}</td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Name</th>
                <td mat-cell *matCellDef="let student">
                  <div class="student-name">
                    <div class="name">{{ student.firstName }} {{ student.lastName }}</div>
                    <div class="email">{{ student.email }}</div>
                  </div>
                </td>
              </ng-container>

              <!-- Program Column -->
              <ng-container matColumnDef="program">
                <th mat-header-cell *matHeaderCellDef>Program</th>
                <td mat-cell *matCellDef="let student">
                  <div class="program-info">
                    <div class="program">{{ student.program }}</div>
                    <div class="semester">Semester: {{ student.semester }}</div>
                  </div>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let student">
                  <span class="status-badge" [ngClass]="student.status.toLowerCase()">
                    {{ student.status | titlecase }}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let student">
                  <div class="action-buttons">
                    <button mat-icon-button color="primary" [routerLink]="['/students', student._id, 'edit']">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteStudent(student)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .list-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #666;
    }

    .empty-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
    }

    .table-container {
      margin-top: 1rem;
      overflow-x: auto;
    }

    .student-name {
      .name {
        font-weight: 500;
      }
      .email {
        font-size: 0.875rem;
        color: #666;
      }
    }

    .program-info {
      .program {
        font-weight: 500;
      }
      .semester {
        font-size: 0.875rem;
        color: #666;
      }
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;

      &.active {
        background-color: #e6f4ea;
        color: #1e4620;
      }

      &.inactive {
        background-color: #fce8e6;
        color: #c5221f;
      }

      &.graduated {
        background-color: #e8f0fe;
        color: #174ea6;
      }

      &.suspended {
        background-color: #fef7e0;
        color: #a45c00;
      }
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    @media (max-width: 768px) {
      .list-container {
        padding: 0;
      }

      .table-container {
        margin: 0 -1rem;
      }
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['studentId', 'name', 'program', 'status', 'actions'];

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        this.snackBar.open('Error loading students', 'Close', { duration: 3000 });
      }
    });
  }

  deleteStudent(student: Student): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Student',
        message: `Are you sure you want to delete ${student.firstName} ${student.lastName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(student._id!).subscribe({
          next: () => {
            this.snackBar.open('Student deleted successfully', 'Close', { duration: 3000 });
            this.loadStudents();
          },
          error: (error) => {
            this.snackBar.open('Error deleting student', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
} 