import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private baseUrl = environment.url + '/assignments';

  constructor(private http: HttpClient) { }
  stdResult(id:any): Observable<any> {
      console.log(id + "ca")
    return this.http.get(`${this.baseUrl}/student/${id}`);
    }
}
