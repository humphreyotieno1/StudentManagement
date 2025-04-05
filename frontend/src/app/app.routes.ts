import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/:id/edit', component: StudentFormComponent },
  { path: '**', redirectTo: '/dashboard' }
];
