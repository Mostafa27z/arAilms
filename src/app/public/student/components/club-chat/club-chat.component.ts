import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubChatService } from '../../../../services/club-chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-club-chat',
  templateUrl: './club-chat.component.html',
  styleUrls: ['./club-chat.component.scss'],
  imports:[FormsModule, CommonModule]
})
export class ClubChatComponent implements OnInit {

  clubId: number = 0;
  messages: any[] = [];
  newMessage: string = '';
  studentId: number = 0;
Id: any;
page = 1;
  
  loading = false;
  allLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private chatService: ClubChatService
  ) {}

  ngOnInit(): void {
    const clubParam = this.route.snapshot.paramMap.get('id');
    if (clubParam) {
      this.clubId = parseInt(clubParam, 10);
      this.loadMessages();
    }

    const user = localStorage.getItem('roleid');
    if (user) {
      this.studentId = parseInt(JSON.parse(user));
    }
    const id = localStorage.getItem('user');
    if (id) {
      this.Id = JSON.parse(id).id;
    }
  }

 

loadMessages(): void {
    if (this.loading || this.allLoaded) return;

    this.loading = true;
    this.chatService.getMessages(this.clubId, this.page).subscribe({
      next: (res) => {
        const newMessages = res.data;

        if (newMessages.length === 0) {
          this.allLoaded = true;
        } else {
          this.messages = [...newMessages, ...this.messages]; // إضافة الرسائل الجديدة فوق
          this.page++;
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const payload = {
      club_id: this.clubId,
      sender_id: this.studentId,
      message: this.newMessage
    };

    this.chatService.sendMessage(payload).subscribe({
      next: () => {
        this.newMessage = '';
        this.loadMessages(); // reload after sending
      },
      error: (err) => {
        console.error('Error sending message:', err);
      }
    });
  }
}
