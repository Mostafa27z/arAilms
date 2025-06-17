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
  loading: boolean = false;

  constructor(private aiService: AiChatService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('user');
    if (storedId) {
      this.userId = parseInt(JSON.parse(storedId).id);
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

  // Add user message immediately 
  this.messages.push({ 
    sender: 'You', 
    text: this.newMessage, 
    time: new Date().toLocaleTimeString(), 
    isUser: true 
  }); 

  const sendingMsg = this.newMessage; 
  this.newMessage = ''; 

  // Add temporary loading message 
  this.messages.push({ 
    sender: 'AI', 
    text: 'Typing...', 
    time: '', 
    isUser: false 
  }); 

  this.loading = true;

  this.aiService.sendMessage(payload).subscribe({ 
    next: (res) => { 
      // Remove temporary loading message
      this.messages.pop(); 

      this.messages.push({ 
        sender: 'AI', 
        text: res.data.ai_response.message, 
        time: new Date(res.data.ai_response.created_at).toLocaleTimeString(), 
        isUser: false 
      }); 

      this.loading = false;
    }, 
    error: (err) => { 
      console.error('Error sending message:', err); 
      this.messages = this.messages.filter(m => m.text !== sendingMsg); 
      this.loading = false;
    } 
  }); 
}

}
