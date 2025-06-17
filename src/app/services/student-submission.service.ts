import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentSubmissionService {

  private baseUrl = `${environment.url}/submissions`;

  constructor(private http: HttpClient) { }

  // ✅ Get All Submissions (admin maybe)
  getAllSubmissions(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // ✅ Get single submission by ID
  getSubmission(submissionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${submissionId}`);
  }

  // ✅ Create new submission
  submitAssignment(formData: FormData): Observable<HttpEvent<any>> {
  return this.http.post<HttpEvent<any>>(`${this.baseUrl}`, formData, {
    reportProgress: true,
    observe: 'events'
  });
}

updateAssignment(submissionId: number, formData: FormData): Observable<HttpEvent<any>> {
  return this.http.post<HttpEvent<any>>(`${this.baseUrl}/${submissionId}`, formData, {
    reportProgress: true,
    observe: 'events'
  });
}


  // ✅ Delete submission
  deleteSubmission(submissionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${submissionId}`);
  }

  // ✅ Get submissions by Student ID
  getSubmissionsByStudent(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}`);
  }

  // ✅ Get submissions by Assignment ID
  getSubmissionsByAssignment(assignmentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/assignment/${assignmentId}`);
  }

  // ✅ Check Submission Status
  checkSubmissionStatus(studentId: number, assignmentId: number): Observable<any> {
    const data = { student_id: studentId, assignment_id: assignmentId };
    return this.http.post(`${this.baseUrl}/check`, data);
  }

  // ✅ NEW: Get submissions by Teacher ID (for teacher reviews)
  getSubmissionsByTeacher(teacherId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/byteacher/${teacherId}`);
  }
}
