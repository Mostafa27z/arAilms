import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExamQuestionService {
  private baseUrl = `${environment.url}/exam-questions`;

  constructor(private http: HttpClient) {}

  // الحصول على أسئلة امتحان معين
  getByExam(examId: number) {
    return this.http.get<any>(`${this.baseUrl}/exam/${examId}`);
  }

  // إنشاء سؤال
  create(data: any) {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  // تعديل سؤال
  update(id: number, data: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  // حذف سؤال
  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
