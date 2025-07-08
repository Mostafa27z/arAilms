import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'; 

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {
  private baseUrl = `${environment.url}/exam-results`;

  constructor(private http: HttpClient) {}

  // عرض نتائج الطلاب في امتحان معين
  getResultsByExam(examId: number) {
    return this.http.get<any>(`${this.baseUrl}/exam/${examId}/all`);
  }
getResultsByTeacher(teacherId: number) {
  return this.http.get<any>(`${this.baseUrl}/teacher/${teacherId}/all`);
}

  // عرض تفاصيل نتيجة واحدة
  getResultById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
