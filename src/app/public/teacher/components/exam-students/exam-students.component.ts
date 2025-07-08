import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamAnswerService } from '../../../../services/exam-answer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-students',
  templateUrl: './exam-students.component.html',
  styleUrls: ['./exam-students.component.scss'],
  imports:[CommonModule]
})
export class ExamStudentsComponent implements OnInit {
  examId!: number;
  students: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private answerService: ExamAnswerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    this.loadStudents();
  }

  loadStudents() {
    this.answerService.getStudentsWhoAnswered(this.examId).subscribe(res => {
      this.students = res.data;
      console.log(res.data)
      this.loading = false;
    });
  }

  goToAnswers(studentId: number) {
    this.router.navigate(['/teacher/exam', this.examId, 'student', studentId, 'answers']);
  }
}
