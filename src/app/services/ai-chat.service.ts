import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {

  private baseUrl = `${environment.url}/chat-logs`;

  constructor(private http: HttpClient) {}

  // جلب كل المحادثات (اختياري لو تحتاجه)
  getAllChatLogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // جلب المحادثة الخاصة بالمستخدم الحالي
  getUserHistory(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  // إرسال رسالة جديدة و استقبال رد الـ AI
  sendMessage(payload: { user_id: number; message: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, payload);
  }

  // جلب محادثة واحدة حسب الـ ID (لو حبيت تستخدمها لاحقا)
  getChatLog(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // تحديث رسالة قديمة
  updateChatLog(id: number, message: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { message });
  }

  // حذف محادثة
  deleteChatLog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
