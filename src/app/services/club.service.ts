import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseUrl = `${environment.url}/clubs`;

  constructor(private http: HttpClient) {}

  // Get all clubs with pagination
  getAllClubs(page: number = 1): Observable<any> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // Create a new club
  createClub(data: { name: string, description?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Get single club by ID
  getClub(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Update club
  updateClub(id: number, data: { name?: string, description?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete club
  deleteClub(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
