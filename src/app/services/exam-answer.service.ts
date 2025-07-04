import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExamAnswerService {
  private baseUrl = `${environment.url}/exam-answers`;

  constructor(private http: HttpClient) {}

  // إرسال الإجابات (MCQ + Essay)
  submitAnswers(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, payload);
  }

  // جلب إجابات الطالب في امتحان معين
  getStudentAnswersForExam(examId: number, studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/exam/${examId}/student/${studentId}`);
  }

  // تعديل الدرجة لسؤال مقالي
  updateScore(answerId: number, score: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${answerId}/score`, { score });
  }

  // جلب كل الإجابات (للإداري أو المعلم)
  getAllAnswers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
