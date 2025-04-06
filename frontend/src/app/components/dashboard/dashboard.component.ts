import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../students/student-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container">
      <h2>Dashboard</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Students</h3>
          <p class="stat-number">{{totalStudents}}</p>
          <a routerLink="/students">View All Students</a>
        </div>
        
        <div class="stat-card">
          <h3>Active Students</h3>
          <p class="stat-number">{{activeStudents}}</p>
          <a routerLink="/students">View Active Students</a>
        </div>
        
        <div class="stat-card">
          <h3>Graduated Students</h3>
          <p class="stat-number">{{graduatedStudents}}</p>
          <a routerLink="/students">View Graduated Students</a>
        </div>
      </div>
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
    
    h2 {
      margin: 0 0 2rem;
      color: #333;
      font-size: 1.5rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .stat-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .stat-card h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #495057;
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 1rem 0;
      color: #3498db;
    }
    
    .stat-card a {
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    
    .stat-card a:hover {
      color: #2980b9;
      text-decoration: underline;
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .page-container {
        padding: 1.5rem;
      }
      
      h2 {
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
      }
      
      .stats-grid {
        gap: 1rem;
      }
      
      .stat-card {
        padding: 1.25rem;
      }
      
      .stat-number {
        font-size: 2rem;
        margin: 0.75rem 0;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalStudents = 0;
  activeStudents = 0;
  graduatedStudents = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudentStats();
  }

  loadStudentStats() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.totalStudents = students.length;
        this.activeStudents = students.filter(s => s.status === 'Active').length;
        this.graduatedStudents = students.filter(s => s.status === 'Graduated').length;
      },
      error: (error) => {
        console.error('Error loading student stats:', error);
      }
    });
  }
} 