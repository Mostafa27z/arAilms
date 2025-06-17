import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherAssignmentReviewService {

  private baseUrl = `${environment.url}/teacher-assignment-reviews`;

  constructor(private http: HttpClient) { }

  // ✅ create or update review (smart endpoint)
  storeOrUpdateReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/store-or-update`, reviewData);
  }

  // ✅ get review for specific submission
  getReviewsBySubmission(submissionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-submission/${submissionId}`);
  }

  // ✅ ممكن تضيف هنا أي دوال تانية حسب الحاجة مثلا:
  getReviewsByTeacher(teacherId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-teacher/${teacherId}`);
  }
}
