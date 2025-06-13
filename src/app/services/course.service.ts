import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private baseUrl = environment.url + '/courses';

  constructor(private http: HttpClient) {}
  getAllCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCourse(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getCourseLessons(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons`);
  }
}
