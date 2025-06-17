import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClubMemberService {

  private baseUrl = `${environment.url}/clubs/members`;

  constructor(private http: HttpClient) {}

  // Get all members
  getAllMembers(page: number = 1): Observable<any> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // Add member to club
  addMember(data: { student_id: number, club_id: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Get single member by ID
  getMember(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Remove member from club
  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getMyMemberships(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?student_id=${studentId}`);
  }

  joinClub(data: { club_id: number; student_id: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }
  getMembers(clubId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?club_id=${clubId}`);
  }
}
