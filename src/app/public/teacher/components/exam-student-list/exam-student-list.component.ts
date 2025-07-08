import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamAnswerService } from '../../../../services/exam-answer.service';

@Component({
  selector: 'app-exam-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exam-student-list.component.html',
  styleUrls: ['./exam-student-list.component.scss']
})
export class ExamStudentListComponent implements OnInit {
  examId!: number;
  students: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private examAnswerService: ExamAnswerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.examAnswerService.getStudentsWhoAnswered(this.examId).subscribe({
      next: (res) => {
        this.students = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'فشل في تحميل بيانات الطلاب.';
        this.loading = false;
      }
    });
  }

  viewAnswers(studentId: number) {
    this.router.navigate([`/teacher/exam/${this.examId}/student/${studentId}/answers`]);
  }
}
