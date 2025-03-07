import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface TestScore {
  name: string;
  score: string;
  date: string;
}

interface Assignment {
  name: string;
  dueDate: string;
  status: string;
  progress: number;
  action: string;
}
@Component({
  selector: 'app-tests',
  imports: [CommonModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss'
})
export class TestsComponent {
  assignments: Assignment[] = [
    { name: 'Math Homework', dueDate: '2023-10-15', status: 'Submitted', progress: 5, action: 'View' },
    { name: 'Science Project', dueDate: '2023-10-20', status: 'Not Submitted', progress: 5, action: 'Submit Now' },
    { name: 'History Essay', dueDate: '2023-10-25', status: 'In Progress', progress: 5, action: 'Edit' },
    { name: 'Art Assignment', dueDate: '2023-10-30', status: 'Submitted', progress: 5, action: 'View' },
    { name: 'English Worksheet', dueDate: '2023-10-18', status: 'Not Submitted', progress: 5, action: 'Submit Now' }
  ];
  tests: TestScore[] = [
    { name: 'Math Test', score: '95%', date: '08/15/2023' },
    { name: 'Science Exam', score: '88%', date: '08/22/2023' },
    { name: 'History Quiz', score: '92%', date: '09/01/2023' }
  ];
}
