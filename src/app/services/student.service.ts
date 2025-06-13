import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = environment.url + '/students';

  constructor(private http: HttpClient) { }
  stdcourses(id: any): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}/courses`);
  }

}
