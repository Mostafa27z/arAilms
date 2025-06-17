import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private baseUrl = environment.url + '/courses';

  constructor(private http: HttpClient) {}
   getCourseLessons(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons`);
  }
  getAllCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createCourse(data: any, onProgress: (progress: number) => void): Observable<any> {
    const req = new HttpRequest('POST', `${this.baseUrl}`, data, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = Math.round((event.loaded / (event.total || 1)) * 100);
          onProgress(progress);
        }
        if (event.type === HttpEventType.Response) {
          return event.body;
        }
        return null;
      })
    );
  }
getCoursesByTeacher(teacherId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/teachers/${teacherId}/courses`);
}

  updateCourse(id: number, data: any, onProgress: (progress: number) => void): Observable<any> {
    const req = new HttpRequest('POST', `${this.baseUrl}/${id}?_method=PUT`, data, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = Math.round((event.loaded / (event.total || 1)) * 100);
          onProgress(progress);
        }
        if (event.type === HttpEventType.Response) {
          return event.body;
        }
        return null;
      })
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}