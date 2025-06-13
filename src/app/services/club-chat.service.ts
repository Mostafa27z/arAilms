import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClubChatService {
  private baseUrl = `${environment.url}/clubs`;

  constructor(private http: HttpClient) {}

  // Get messages for a specific club
  getMessages(clubId: number, page: number = 1): Observable<any> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.baseUrl}/${clubId}/messages`, { params });
  }

  // Send a new message
  sendMessage(data: {
    club_id: number;
    sender_id: number;
    message: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/messages`, data);
  }

  // Get a single message
  getMessage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages/${id}`);
  }

  // Delete a message
  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/messages/${id}`);
  }
}
