import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ClubMemberService {
  private baseUrl = `${environment.url}/clubs/members`;

  constructor(private http: HttpClient) {}

  // ✅ Get all members with optional filters
  getAllMembers(paramsObj: { page?: number, club_id?: number, student_id?: number } = {}): Observable<any> {
    let params = new HttpParams();
    if (paramsObj.page) params = params.set('page', paramsObj.page.toString());
    if (paramsObj.club_id) params = params.set('club_id', paramsObj.club_id.toString());
    if (paramsObj.student_id) params = params.set('student_id', paramsObj.student_id.toString());

    return this.http.get(this.baseUrl, { params });
  }

  // ✅ Get members of specific club
  getMembers(clubId: number): Observable<any> {
    return this.getAllMembers({ club_id: clubId });
  }

  // ✅ Get memberships of a student
  getMyMemberships(studentId: number): Observable<any> {
    return this.getAllMembers({ student_id: studentId });
  }

  // ✅ Add member (can include status)
  addMember(data: { student_id: number, club_id: number, status?: string }): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // ✅ Get single member
  getMember(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // ✅ Update member (e.g., to approve/reject)
  updateMemberStatus(id: number, status: 'approved' | 'pending' | 'rejected'): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { status });
  }

  // ✅ Delete member
  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getPendingRequests(clubId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}?club_id=${clubId}&status=pending`);
}

getAllStudents(search: string = '', page: number = 1): Observable<any> {
  let params = new HttpParams()
    .set('search', search)
    .set('page', page);

  return this.http.get(this.baseUrl, { params });
}



approveRequest(id: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}/approve`, {}); // ✅
}

rejectRequest(id: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}/reject`, {}); // ✅
}

joinClub(data: { club_id: number; student_id: number; status?: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}`, data);
}
}
