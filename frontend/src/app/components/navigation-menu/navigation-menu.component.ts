import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="/new">Student Details</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/new" routerLinkActive="active">Add Student</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/list" routerLinkActive="active">View Students</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .active {
      font-weight: bold;
    }
  `]
})
export class NavigationMenuComponent { } 