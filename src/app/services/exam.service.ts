import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examsUrl = `${environment.url}/exams`;
  private resultsUrl = `${environment.url}/exam-results`;

  constructor(private http: HttpClient) {}


  // جلب الامتحانات القادمة
  upcoming(): Observable<any> {
    return this.http.get(`${this.examsUrl}/upcoming/all`);
  }

  // جلب نتائج الطالب
  stdResult(studentId: number): Observable<any> {
    return this.http.get(`${this.resultsUrl}/student/${studentId}/all`);
  }

  // جلب امتحان معين بتفاصيله (مع الأسئلة)
  getExam(id: number): Observable<any> {
    return this.http.get(`${this.examsUrl}/${id}`);
  }

  // جلب كل امتحانات كورس معين
  getByCourse(courseId: number): Observable<any> {
    return this.http.get(`${this.examsUrl}/course/${courseId}/all`);
  }

  // جلب امتحانات اليوم
  today(): Observable<any> {
    return this.http.get(`${this.examsUrl}/today/all`);
  }

  // جلب الامتحانات المنتهية
  past(): Observable<any> {
    return this.http.get(`${this.examsUrl}/past/all`);
  }

  // إرسال إجابات الامتحان (للأسئلة الاختيارية والمقالية)
  submitAnswers(data: any[]): Observable<any> {
    return this.http.post(`${environment.url}/student-answers`, data);
  }
}
