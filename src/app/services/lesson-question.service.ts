import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LessonQuestionService {
  private baseUrl = `${environment.url}/questions`;

  constructor(private http: HttpClient) {}

  getQuestionsByLesson(lessonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-lesson/${lessonId}/`);
  }
}
