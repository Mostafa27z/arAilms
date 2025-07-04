import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../../services/exam.service';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.scss'
})
export class ExamListComponent implements OnInit {
  exams: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loadUpcomingExams();
  }

  loadUpcomingExams() {
    this.loading = true;
    this.examService.upcoming().subscribe({
      next: (res) => {
        this.exams = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل الامتحانات';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
