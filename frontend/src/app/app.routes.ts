import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'students',
    loadComponent: () => import('./components/students/students.component').then(m => m.StudentsComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
