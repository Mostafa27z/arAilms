import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAnswerService {
  private baseUrl = `${environment.url}/student-answers`;

  constructor(private http: HttpClient) {}

  submitAnswer(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
