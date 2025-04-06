import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Student } from '../components/students/student-form.component';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<any>(`${this.apiUrl}/students`).pipe(
      map(response => {
        // Handle both response formats: direct array or { success, data } object
        if (Array.isArray(response)) {
          return response;
        } else if (response && response.data) {
          return response.data;
        }
        return [];
      }),
      catchError(this.handleError)
    );
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student).pipe(
      catchError(this.handleError)
    );
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/students/${id}`, student).pipe(
      catchError(this.handleError)
    );
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/students/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.status === 400) {
        // Validation error
        if (error.error.errors && Array.isArray(error.error.errors)) {
          errorMessage = error.error.errors.join('\n');
        } else if (error.error.error) {
          errorMessage = error.error.error;
        }
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}