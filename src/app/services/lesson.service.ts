import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = `${environment.url}/lessons`;

  constructor(private http: HttpClient) {}

  getLessonsByCourse(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/${courseId}/all`);
  }

  getLesson(lessonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${lessonId}`);
  }
}
