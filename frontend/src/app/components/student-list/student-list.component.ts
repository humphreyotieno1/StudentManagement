import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  template: `
    <div class="list-container">
      <div class="list-header">
        <div class="header-content">
          <h2>Student Records</h2>
          <p class="text-secondary">Manage and view all student information</p>
        </div>
        <div class="header-actions">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search Students</mat-label>
            <input matInput (keyup)="applyFilter($event)" placeholder="Search by name, ID, or program" #input>
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          <button mat-raised-button color="primary" routerLink="/students/new" class="btn-primary">
            <mat-icon>add</mat-icon>
            Add New Student
          </button>
        </div>
      </div>

      <div *ngIf="!dataSource.data.length" class="empty-state">
        <mat-icon class="empty-icon">school</mat-icon>
        <h3>No Student Records Found</h3>
        <p class="text-secondary">Get started by adding your first student record</p>
        <button mat-raised-button color="primary" routerLink="/students/new" class="btn-primary">
          Add Student
        </button>
      </div>

      <div *ngIf="dataSource.data.length > 0" class="table-container">
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- Student ID Column -->
          <ng-container matColumnDef="studentId">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Student ID</th>
            <td mat-cell *matCellDef="let student">{{ student.studentId }}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let student">
              <div class="student-name">
                <div class="name">{{ student.firstName }} {{ student.lastName }}</div>
                <div class="email">{{ student.email }}</div>
              </div>
            </td>
          </ng-container>

          <!-- Academic Info Column -->
          <ng-container matColumnDef="academic">
            <th mat-header-cell *matHeaderCellDef>Academic Info</th>
            <td mat-cell *matCellDef="let student">
              <div class="academic-info">
                <div class="program">{{ student.program }} ({{ student.semester }})</div>
                <div class="gpa">GPA: {{ student.gpa | number:'1.2-2' }}</div>
                <div class="standing" [ngClass]="student.academicStanding | lowercase">
                  {{ student.academicStanding }}
                </div>
              </div>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
            <td mat-cell *matCellDef="let student">
              <span class="status-badge" [ngClass]="student.status.toLowerCase()">
                {{ student.status }}
              </span>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let student">
              <div class="action-buttons">
                <button mat-icon-button color="primary" 
                        [routerLink]="['/students', student._id, 'edit']"
                        matTooltip="Edit Student">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" 
                        (click)="deleteStudent(student)"
                        matTooltip="Delete Student">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

          <!-- Row shown when no matching data -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="5">No data matching the filter "{{input.value}}"</td>
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[10, 25, 50, 100]"
                     showFirstLastButtons
                     aria-label="Select page of students">
        </mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .list-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: var(--spacing-lg) var(--spacing-md);
    }

    .list-header {
      margin-bottom: var(--spacing-lg);
    }

    .header-content {
      margin-bottom: var(--spacing-md);
    }

    .header-content h2 {
      margin-bottom: var(--spacing-xs);
    }

    .text-secondary {
      color: var(--text-secondary);
      margin-bottom: 0;
    }

    .header-actions {
      display: flex;
      gap: var(--spacing-md);
      align-items: center;
      width: 100%;
    }

    .search-field {
      flex: 1;
    }

    .empty-state {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--text-primary);
    }

    .empty-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: var(--spacing-md);
      color: var(--text-secondary);
    }

    .table-container {
      margin-top: var(--spacing-md);
      overflow-x: auto;
      border-radius: var(--border-radius);
      background: var(--surface);
    }

    table {
      width: 100%;
    }

    .mat-mdc-header-cell {
      font-weight: 500;
      color: var(--text-secondary);
    }

    .mat-mdc-cell {
      color: var(--text-primary);
    }

    .student-name {
      .name {
        font-weight: 500;
      }
      .email {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }

    .academic-info {
      .program {
        font-weight: 500;
      }
      .gpa {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      .standing {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: var(--border-radius-sm);
        display: inline-block;
        margin-top: 0.25rem;

        &.good-standing {
          background: var(--success-light);
          color: var(--success);
        }

        &.academic-warning {
          background: var(--warning-light);
          color: var(--warning);
        }

        &.academic-probation {
          background: var(--error-light);
          color: var(--error);
        }

        &.academic-suspension {
          background: var(--error-light);
          color: var(--error);
        }
      }
    }

    .status-badge {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius-sm);
      display: inline-block;

      &.active {
        background: var(--success-light);
        color: var(--success);
      }

      &.inactive {
        background: var(--text-secondary-light);
        color: var(--text-secondary);
      }

      &.graduated {
        background: var(--primary-light);
        color: var(--primary);
      }

      &.suspended {
        background: var(--error-light);
        color: var(--error);
      }

      &.on-leave {
        background: var(--warning-light);
        color: var(--warning);
      }
    }

    .action-buttons {
      display: flex;
      gap: var(--spacing-xs);
    }

    @media (max-width: 768px) {
      .list-container {
        padding: var(--spacing-md);
      }

      .header-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .search-field {
        margin-bottom: var(--spacing-md);
      }
    }
  `]
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['studentId', 'name', 'academic', 'status', 'actions'];
  dataSource: MatTableDataSource<Student>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Student>([]);
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.dataSource.data = students;
      },
      error: (error) => {
        this.snackBar.open('Error loading students', 'Close', { duration: 3000 });
        console.error('Error loading students:', error);
      }
    });
  }

  deleteStudent(student: Student): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Student',
        message: `Are you sure you want to delete ${student.firstName} ${student.lastName}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
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
            console.error('Error deleting student:', error);
          }
        });
      }
    });
  }
} 