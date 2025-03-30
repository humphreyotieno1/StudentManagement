import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: StudentListComponent },
  { path: 'new', component: StudentFormComponent },
  { path: 'edit/:id', component: StudentFormComponent },
  { path: '**', redirectTo: '/list' }
];
