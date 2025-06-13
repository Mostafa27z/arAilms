import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentSubmissionService {

  private baseUrl = `${environment.url}/submissions`;

  constructor(private http: HttpClient) { }

  getAllSubmissions(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getSubmission(submissionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${submissionId}`);
  }

  
  submitAssignment(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData);
  }

  updateAssignment(submissionId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/${submissionId}`, formData);
  }
  deleteSubmission(submissionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${submissionId}`);
  }

  getSubmissionsByStudent(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}`);
  }

  getSubmissionsByAssignment(assignmentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/assignment/${assignmentId}`);
  }

  checkSubmissionStatus(studentId: number, assignmentId: number): Observable<any> {
    const data = { student_id: studentId, assignment_id: assignmentId };
    return this.http.post(`${this.baseUrl}/check`, data);
  }
}
