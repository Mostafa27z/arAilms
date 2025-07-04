import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../../services/exam.service';
import { ExamAnswerService } from '../../../../services/exam-answer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam-take',
  standalone: true,
  templateUrl: './exam-take.component.html',
  styleUrl: './exam-take.component.scss',
  imports: [CommonModule, FormsModule],
})
export class ExamTakeComponent implements OnInit {
  examId: number = 0;
  studentId: number = 0;
  exam: any = null;
  answers: { [questionId: number]: any } = {};
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private examAnswerService: ExamAnswerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    const student = localStorage.getItem('roleid');
    this.studentId = student ? JSON.parse(student) : 0;

    if (this.examId) {
      this.loadExam();
    }
  }

  loadExam() {
    this.examService.getExam(this.examId).subscribe({
      next: (res: any) => {
        this.exam = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading exam:', err);
        this.loading = false;
      },
    });
  }

  submitExam() {
    const payloads: any[] = [];

    for (let question of this.exam.questions) {
      const answer = this.answers[question.id];

      if (answer === undefined || answer === null || answer === '') continue;

      const payload = {
        student_id: this.studentId,
        question_id: question.id,
        selected_option_id: question.type === 'mcq' ? answer : null,
        essay_answer: question.type === 'essay' ? answer : null,
        score: null
      };

      payloads.push(payload);
    }

    if (payloads.length === 0) {
      alert('من فضلك أجب على الأقل سؤالًا واحدًا قبل إرسال الامتحان.');
      return;
    }

    // ✅ نرسل exam_id مع answers
    const submissionData = {
      exam_id: this.examId,
      answers: payloads
    };

    this.examAnswerService.submitAnswers(submissionData).subscribe({
      next: () => {
        alert('✅ تم إرسال إجابات الامتحان بنجاح!');
        this.router.navigate(['/student/exams']);
      },
      error: (err) => {
        console.error('❌ Error submitting exam:', err);
        alert('حدث خطأ أثناء إرسال الامتحان.');
      }
    });
  }
}
