import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
private baseUrl = environment.url + '/exam';
  constructor(private http: HttpClient) { }
  upcoming(): Observable<any> {
  return this.http.get(`${this.baseUrl}s/upcoming/all`);
  }
  stdResult(id:any): Observable<any> {
    console.log(id + "aa")
  return this.http.get(`${this.baseUrl}-results/student/${id}/all`);
  }
}
