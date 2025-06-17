import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = environment.url + '/students';

  constructor(private http: HttpClient) { }

  getAllStudents(search: string = '', page: number = 1): Observable<any> {
  let params = new HttpParams()
    .set('search', search)
    .set('page', page);

  return this.http.get(this.baseUrl, { params });
}

  stdcourses(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/courses`);
  }

  getProfile(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/profile`);
  }
  deleteStudent(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

}
