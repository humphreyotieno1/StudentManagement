import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  template: `
    <nav class="main-nav">
      <a routerLink="/dashboard" routerLinkActive="active">
        <mat-icon>dashboard</mat-icon>
        Dashboard
      </a>
      <a routerLink="/students" routerLinkActive="active">
        <mat-icon>school</mat-icon>
        Student Records
      </a>
      <a routerLink="/reports" routerLinkActive="active">
        <mat-icon>assessment</mat-icon>
        Reports
      </a>
    </nav>
  `,
  styles: [`
    .main-nav {
      display: flex;
      gap: 2rem;
      padding: 1rem;
      background-color: #2c3e50;
    }

    .main-nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.3s ease;
    }

    .main-nav a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .main-nav a.active {
      background-color: #3498db;
    }

    @media (max-width: 768px) {
      .main-nav {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class NavigationMenuComponent { } 