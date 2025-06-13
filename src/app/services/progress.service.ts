import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private baseUrl = `${environment.url}/lesson-progress`;

  constructor(private http: HttpClient) {}

  markProgress(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
