import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class GroupMemberService {
  private baseUrl = `${environment.url}/group-members`;

  constructor(private http: HttpClient) {}

  requestJoin(data: { student_id: number, group_id: number }) {
    return this.http.post(`${this.baseUrl}/request`, data);
  }

  approve(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/approve`, {});
  }

  reject(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/reject`, {});
  }

  getPending(groupId: number) {
    return this.http.get(`${this.baseUrl}/group/${groupId}/pending`);
  }
}
