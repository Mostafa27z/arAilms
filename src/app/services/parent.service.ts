import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private baseUrl = `${environment.url}/parents`;

  constructor(private http: HttpClient) {}

  // Get children (students) by parentId
  getMyStudents(parentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${parentId}/students`);
  }
}
