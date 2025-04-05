import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="navbar">
        <div class="navbar-brand" (click)="navigateTo('/dashboard')">
          <mat-icon class="brand-icon">school</mat-icon>
          <span class="brand-text">Student Management</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <a mat-button routerLink="/dashboard" routerLinkActive="active" (click)="closeMobileMenu()">
            <mat-icon>dashboard</mat-icon>
            Dashboard
          </a>
          <a mat-button routerLink="/students" routerLinkActive="active" (click)="closeMobileMenu()">
            <mat-icon>people</mat-icon>
            Students
          </a>
          <a mat-button routerLink="/students/new" routerLinkActive="active" (click)="closeMobileMenu()">
            <mat-icon>person_add</mat-icon>
            Add Student
          </a>
        </nav>

        <!-- Mobile Navigation -->
        <button mat-icon-button class="mobile-menu-button" [matMenuTriggerFor]="mobileMenu">
          <mat-icon>menu</mat-icon>
        </button>
        <mat-menu #mobileMenu="matMenu" class="mobile-menu">
          <a mat-menu-item routerLink="/dashboard" routerLinkActive="active" (click)="closeMobileMenu()">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-menu-item routerLink="/students" routerLinkActive="active" (click)="closeMobileMenu()">
            <mat-icon>people</mat-icon>
            <span>Students</span>
          </a>
          <a mat-menu-item routerLink="/students/new" routerLinkActive="active" (click)="closeMobileMenu()">
            <mat-icon>person_add</mat-icon>
            <span>Add Student</span>
          </a>
        </mat-menu>

        <div class="navbar-actions">
          <button mat-icon-button>
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button>
            <mat-icon>account_circle</mat-icon>
          </button>
        </div>
      </mat-toolbar>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      padding: 0 16px;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-right: 24px;
      cursor: pointer;
    }

    .brand-icon {
      font-size: 24px;
    }

    .brand-text {
      font-size: 1.2rem;
      font-weight: 500;
    }

    .desktop-nav {
      display: flex;
      gap: 8px;
      margin-right: auto;
    }

    .desktop-nav a {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: inherit;
    }

    .desktop-nav a.active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .navbar-actions {
      display: flex;
      gap: 8px;
      margin-left: 16px;
    }

    .mobile-menu-button {
      display: none;
    }

    .main-content {
      margin-top: 64px;
      padding: 20px;
      flex: 1;
    }

    @media (max-width: 768px) {
      .desktop-nav {
        display: none;
      }

      .mobile-menu-button {
        display: block;
        margin-right: auto;
      }

      .navbar-brand {
        margin-right: 16px;
      }

      .brand-text {
        display: none;
      }

      .mobile-menu {
        width: 100%;
        max-width: 300px;
      }

      .mobile-menu a {
        display: flex;
        align-items: center;
        gap: 16px;
        text-decoration: none;
        color: inherit;
      }

      .mobile-menu a.active {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  `]
})
export class AppComponent {
  title = 'student-management-frontend';

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  closeMobileMenu(): void {
    // This will be called when a menu item is clicked
    // The menu will automatically close when an item is clicked
  }
}
