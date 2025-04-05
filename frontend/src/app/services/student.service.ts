import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.error.errors && Array.isArray(error.error.errors)) {
        errorMessage = error.error.errors.join(', ');
      } else if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 400) {
        errorMessage = 'Invalid data provided. Please check your input.';
      } else if (error.status === 404) {
        errorMessage = 'Student not found.';
      } else if (error.status === 409) {
        errorMessage = 'A student with this email already exists.';
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else {
        errorMessage = `Server error (${error.status}). Please try again later.`;
      }
    }
    return throwError(() => ({ message: errorMessage }));
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        map(response => {
          // Handle different response formats
          if (Array.isArray(response)) {
            return response;
          } else if (response && response.data && Array.isArray(response.data)) {
            return response.data;
          } else {
            return [];
          }
        }),
        catchError(this.handleError)
      );
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => {
          // Handle different response formats
          if (response && response.data) {
            return response.data;
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<any>(this.apiUrl, student)
      .pipe(
        map(response => {
          // Handle different response formats
          if (response && response.data) {
            return response.data;
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, student)
      .pipe(
        map(response => {
          // Handle different response formats
          if (response && response.data) {
            return response.data;
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(() => {}),
        catchError(this.handleError)
      );
  }
}