import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = `${environment.url}/questions`;

  constructor(private http: HttpClient) {}

  getQuestionsByCourse(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/${courseId}`);
  }

  getQuestionsByLesson(lessonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-lesson/${lessonId}`);
  }
// Get all questions
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // // Get questions by lesson id
  // getQuestionsByLesson(lessonId: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/by-lesson/${lessonId}`);
  // }

  // Get single question by id
  getQuestion(questionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${questionId}`);
  }

  // getQuestionsByLesson(lessonId: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/lesson/${lessonId}/all`);
  // }

  // Update question title
  updateQuestion(questionId: number, data: { title: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${questionId}`, data);
  }

  // Create question (لو احتجنا في الإنشاء لاحقاً)
  createQuestion(data: { lesson_id: number, title: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Delete question
  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${questionId}`);
  }
}
