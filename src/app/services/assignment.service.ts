import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private baseUrl = environment.url + '/assignments';

  constructor(private http: HttpClient) { }
  stdResult(id:any): Observable<any> {
      console.log(id + "ca")
    return this.http.get(`${this.baseUrl}/student/${id}`);
    }
    getAssignmentsByStudent(studentId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/student/${studentId}`);
}
getAssignmentsByTeacher(teacherId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/teacher/${teacherId}`);
  }

  // ✅ Get all assignments for a specific lesson
  getAssignmentsByLesson(lessonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/lesson/${lessonId}`);
  }

  // ✅ Create new assignment (with file)
  createAssignment(formData: FormData, onProgress?: (progress: number) => void): Observable<any> {
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
        return null;
      })
    );
  }

  // ✅ Delete assignment
  deleteAssignment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // ✅ Get single assignment by ID
  getAssignment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
