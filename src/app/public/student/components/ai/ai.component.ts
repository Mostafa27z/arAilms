import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiChatService } from '../../../../services/ai-chat.service';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: string;
  text: string;
  time: string;
  isUser: boolean;
}

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.scss'
})
export class AiComponent implements OnInit {

  messages: Message[] = [];
  newMessage: string = '';
  userId: number = 0;

  constructor(private aiService: AiChatService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('roleid');
    if (storedId) {
      this.userId = parseInt(JSON.parse(storedId));
      this.loadChatHistory();
    }
  }

  loadChatHistory(): void {
    this.aiService.getUserHistory(this.userId).subscribe({
      next: (res) => {
        this.messages = res.data.map((msg: any) => ({
          sender: msg.is_ai ? 'AI' : 'You',
          text: msg.message,
          time: new Date(msg.created_at).toLocaleTimeString(),
          isUser: !msg.is_ai
        }));
      },
      error: (err) => {
        console.error('Error loading chat history:', err);
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const payload = { user_id: this.userId, message: this.newMessage };

    // Add message directly for better UX
    this.messages.push({
      sender: 'You',
      text: this.newMessage,
      time: new Date().toLocaleTimeString(),
      isUser: true
    });

    const sendingMsg = this.newMessage;
    this.newMessage = '';

    this.aiService.sendMessage(payload).subscribe({
      next: (res) => {
        this.messages.push({
          sender: 'AI',
          text: res.data.ai_response.message,
          time: new Date(res.data.ai_response.created_at).toLocaleTimeString(),
          isUser: false
        });
      },
      error: (err) => {
        console.error('Error sending message:', err);
        // rollback in case of error
        this.messages = this.messages.filter(m => m.text !== sendingMsg);
      }
    });
  }
}
