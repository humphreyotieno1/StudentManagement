import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      
      <div class="stats-grid">
        <mat-card>
          <mat-card-content>
            <div class="stat-item">
              <mat-icon>people</mat-icon>
              <div class="stat-info">
                <h3>Total Students</h3>
                <p>{{ totalStudents }}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <div class="stat-item">
              <mat-icon>school</mat-icon>
              <div class="stat-info">
                <h3>Active Students</h3>
                <p>{{ activeStudents }}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <div class="stat-item">
              <mat-icon>event</mat-icon>
              <div class="stat-info">
                <h3>New This Month</h3>
                <p>{{ newThisMonth }}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <button mat-raised-button color="primary" routerLink="/students/new">
            <mat-icon>person_add</mat-icon>
            Add New Student
          </button>
          <button mat-raised-button color="accent" routerLink="/students">
            <mat-icon>list</mat-icon>
            View All Students
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }

    h1 {
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-item mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #1976d2;
    }

    .stat-info h3 {
      margin: 0;
      font-size: 16px;
      color: #666;
    }

    .stat-info p {
      margin: 8px 0 0;
      font-size: 24px;
      font-weight: 500;
    }

    .quick-actions {
      margin-top: 32px;
    }

    .quick-actions h2 {
      margin-bottom: 16px;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .actions-grid button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalStudents = 0;
  activeStudents = 0;
  newThisMonth = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.studentService.getStudents().subscribe({
      next: (response: any) => {
        // Check if response is an array or has a data property
        const students = Array.isArray(response) ? response : 
                         (response && response.data && Array.isArray(response.data) ? response.data : []);
        
        this.totalStudents = students.length;
        this.activeStudents = students.filter((student: Student) => student.status === 'Active').length;
        
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        this.newThisMonth = students.filter((student: Student) => {
          if (!student.enrollmentDate) return false;
          const enrollmentDate = new Date(student.enrollmentDate);
          return enrollmentDate.getMonth() === currentMonth && 
                 enrollmentDate.getFullYear() === currentYear;
        }).length;
      },
      error: (error: any) => {
        console.error('Error loading statistics:', error);
        // Set default values in case of error
        this.totalStudents = 0;
        this.activeStudents = 0;
        this.newThisMonth = 0;
      }
    });
  }
} 