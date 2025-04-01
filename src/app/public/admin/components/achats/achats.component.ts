import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface Message {
  sender: string;
  text: string;
  time: string;
  isUser: boolean;
}
@Component({
  selector: 'app-achats',
  imports: [CommonModule],
  templateUrl: './achats.component.html',
  styleUrl: './achats.component.scss'
})
export class AchatsComponent {
  contacts = [
    { name: 'Dr. Sarah Wilson', lastMessage: 'Regarding your thesis proposal...', time: '10:30 AM' },
    { name: 'Prof. James Moore', lastMessage: 'Project submission deadline...', time: 'Yesterday' },
    { name: 'Dr. Emily Chen', lastMessage: 'Research lab schedule update', time: 'Mar 15' },
  ];

  messages: Message[] = [
    { sender: 'Dr. Sarah Wilson', text: 'Hello John, I\'ve reviewed your thesis proposal. There are some points we need to discuss.', time: '10:15 AM', isUser: false },
    { sender: 'You', text: 'Thank you, Professor. When would be a good time to meet?', time: '10:20 AM', isUser: true },
    { sender: 'Dr. Sarah Wilson', text: 'How about tomorrow at 2 PM in my office?', time: '10:30 AM', isUser: false }
  ];
}
