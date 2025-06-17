import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionOptionService {
  private baseUrl = `${environment.url}/question-options`;

  constructor(private http: HttpClient) {}

  // Get options for specific question
  getOptionsByQuestion(questionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/question/${questionId}/all`);
  }

  // Create new option
  createOption(data: { question_id: number, option_text: string, is_correct: boolean }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Update option
  updateOption(optionId: number, data: { option_text: string, is_correct: boolean }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${optionId}`, data);
  }

  // Delete option
  deleteOption(optionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${optionId}`);
  }
}
