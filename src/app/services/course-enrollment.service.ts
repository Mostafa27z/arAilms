import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CourseEnrollmentService {
  private baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  enrollStudent(data: { student_id: number; course_id: number }): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getEnrollment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteEnrollment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
