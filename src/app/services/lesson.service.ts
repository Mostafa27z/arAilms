import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, filter, map } from 'rxjs';

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

  createLesson(formData: FormData, onProgress?: (progress: number) => void): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && onProgress) {
          const progress = Math.round((100 * event.loaded) / (event.total || 1));
          onProgress(progress);
        }
        if (event.type === HttpEventType.Response) {
          return event.body;
        }
      })
    );
  }
  getLessonsByTeacher(teacherId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/teacher/${teacherId}`);
}
updateLesson(lessonId: number, formData: FormData, onProgress?: (progress: number) => void): Observable<any> {
  return this.http.post(`${this.baseUrl}/${lessonId}?_method=PUT`, formData, { 
    reportProgress: true, 
    observe: 'events' 
}).pipe(
    map((event: HttpEvent<any>) => { 
        if (event.type === HttpEventType.UploadProgress && onProgress) { 
            const progress = Math.round((100 * event.loaded) / (event.total || 1)); 
            onProgress(progress); 
        } 
        if (event.type === HttpEventType.Response) { 
            return event.body;
        }
        return null;  // هنا هو المهم
    }),
    // لتفادي الـ null ترجع
    filter(res => res !== null)
);

}
deleteLesson(lessonId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${lessonId}`);
}

}
