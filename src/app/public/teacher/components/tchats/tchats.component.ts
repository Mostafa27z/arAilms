import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ClubChatService } from '../../../../services/club-chat.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-tchats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tchats.component.html',
  styleUrl: './tchats.component.scss'
})
export class TchatsComponent implements OnInit {

  contacts: any[] = [];
  messages: any[] = [];
  selectedContact: any = null;
  screenWidth: number = window.innerWidth;
  newMessage: string = '';
  teacherId: any='';

  constructor(private chatService: ClubChatService, private http: HttpClient) {}

  ngOnInit() {
    this.updateScreenWidth();
    this.loadClubs();
  }

  @HostListener('window:resize')
  updateScreenWidth() {
    this.screenWidth = window.innerWidth;
  }

  loadClubs() { 
  this.http.get<any>(`${environment.url}/clubs-with-last-message`).subscribe({ 
    next: (res) => { 
      this.contacts = res.data.map((club: any) => { 
        return { 
          id: club.id, 
          name: club.name, 
          lastMessage: club.last_message || '', 
          time: club.last_message_date ? this.formatDate(club.last_message_date) : '' 
        }; 
      }); 
      console.log(res.data) 
    }, 
    error: (err) => console.error(err) 
  }); 
}

formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const timePart = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) {
    return `${timePart}`;
  } else if (isYesterday) {
    return `Yesterday ${timePart}`;
  } else {
    const datePart = date.toLocaleDateString();
    return `${datePart} ${timePart}`;
  }
}




  openChat(contact: any) {
    this.selectedContact = contact;
    this.loadMessages(contact.id);
  }

 loadMessages(clubId: number) {
  this.chatService.getMessages(clubId).subscribe({
    next: (res) => {
      this.messages = res.data.map((msg: any) => ({
        text: msg.message,
        time: this.formatDate(msg.sent_at),
        isUser: msg.sender.id == this.getLoggedUserId(),
        name:msg.sender.id == this.getLoggedUserId()?'':`${msg.sender.name} : `
      }));
      console.log(res.data)
    },
    error: (err) => console.error(err)
  });
}


  sendMessage() {
    if (!this.newMessage.trim()) return;

    const data = {
      club_id: this.selectedContact.id,
      sender_id: this.getLoggedUserId(),
      message: this.newMessage
    };

    this.chatService.sendMessage(data).subscribe({
      next: (res) => {
        this.messages.push({
        text: this.newMessage,
        time: this.formatDate(new Date().toISOString()),
        isUser: true
      });

        this.newMessage = '';
      },
      error: (err) => console.error(err)
    });
  }

  closeChat() {
    this.selectedContact = null;
  }

  getLoggedUserId(): number {
    // طبعاً هنا يفضل تجيبها من الـ localStorage أو من الـ Auth Service حسب تطبيقك
    let id: any = localStorage.getItem('user');
    if (id) {
      this.teacherId = parseInt(JSON.parse(id).id);
    }
  
    return this.teacherId ? this.teacherId : 0;
  }
}
