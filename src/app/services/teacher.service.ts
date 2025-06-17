import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

 private baseUrl = environment.url + '/teachers';

  constructor(private http: HttpClient) { }
  getDashboardSummary(teacherId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/${teacherId}/dashboard-summary`);
}

getAllTeachers(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
}

}
