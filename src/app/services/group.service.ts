import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private baseUrl = `${environment.url}/groups`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  update(id: number, data: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getGroupsForStudent(studentId: number) {
    return this.http.get<any>(`${this.baseUrl}/student/${studentId}`);
  }

  getAvailableForStudent(studentId: number) {
    return this.http.get<any>(`${this.baseUrl}/available/${studentId}`);
  }
}
