import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/students';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
      console.error('Client-side error:', error.error);
    } else {
      // Server-side error
      console.error('Server-side error:', error);
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

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createStudent(student: Student): Observable<Student> {
    console.log('Creating student:', student);
    return this.http.post<Student>(this.apiUrl, student)
      .pipe(catchError(this.handleError));
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    console.log('Updating student:', { id, student });
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student)
      .pipe(catchError(this.handleError));
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}