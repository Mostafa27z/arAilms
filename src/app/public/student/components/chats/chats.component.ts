import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

interface Message {
  sender: string;
  text: string;
  time: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chats',
  imports: [CommonModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  contacts = [
    { name: 'Dr. Sarah Wilson', lastMessage: 'How are you?', time: '2h ago' },
    {
      name: 'Dr. Ahmed Ali',
      lastMessage: 'Thanks for the update.',
      time: '1d ago',
    },
  ];

  messages = [
    { text: 'Hello there!', time: '10:00 AM', isUser: false },
    { text: 'Hi, how can I help?', time: '10:01 AM', isUser: true },
  ];

  selectedContact: any = null;
  screenWidth: number = window.innerWidth;

  ngOnInit() {
    this.updateScreenWidth();
  }

  @HostListener('window:resize')
  updateScreenWidth() {
    this.screenWidth = window.innerWidth;
  }

  openChat(contact: any) {
    this.selectedContact = contact;
  }

  closeChat() {
    this.selectedContact = null;
  }
}
