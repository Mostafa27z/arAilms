import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupSessionService {
  private baseUrl = `${environment.url}/group-sessions`;

  constructor(private http: HttpClient) {}

  createSession(data: any) : Observable<any>{
    return this.http.post(`${this.baseUrl}`, data);
  }

  getByGroup(groupId: number) {
    return this.http.get(`${this.baseUrl}/group/${groupId}`);
  }
  deleteSession(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

}
