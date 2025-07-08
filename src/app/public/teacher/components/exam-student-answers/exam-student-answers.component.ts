import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamAnswerService } from '../../../../services/exam-answer.service';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-student-answers',
  templateUrl: './exam-student-answers.component.html',
  styleUrls: ['./exam-student-answers.component.scss'],
  imports:[CommonModule , FormsModule , ReactiveFormsModule  ]
})
export class ExamStudentAnswersComponent implements OnInit {
 
  // constructor(
  //   private route: ActivatedRoute,
  //   private answerService: ExamAnswerService,
  //   private fb: FormBuilder
  // ) {}
 examId!: number;
  studentId!: number;
  answers: any[] = [];
  // scoreForm: FormGroup = this.fb.group({});
  loading = false;
  scoreForm!: FormGroup; // بدون تهيئة هنا

constructor(
  private route: ActivatedRoute,
  private answerService: ExamAnswerService,
  private fb: FormBuilder
) {}

ngOnInit(): void {
  this.examId = +this.route.snapshot.paramMap.get('examId')!;
  this.studentId = +this.route.snapshot.paramMap.get('studentId')!;
  this.scoreForm = this.fb.group({}); // ✅ تهيئة هنا بعد تعريف fb
  console.log(this.studentId  ,this.examId )
  this.loadAnswers();
}


  loadAnswers() {
  this.loading = true;
  this.answerService.getAnswers(this.examId, this.studentId).subscribe((res: any) => {
    this.answers = res.data;
console.log(res.data)
    // تحقق من وجود question قبل استخدامه
    for (let ans of this.answers) {
      if (ans.question && ans.question.type === 'essay') {
        this.scoreForm.addControl(ans.id, new FormControl(ans.score || 0));
      }
    }

    this.loading = false;
  });
}


  saveScores() {
    const updates = [];

    for (const answerId in this.scoreForm.value) {
      const score = this.scoreForm.value[answerId];
      updates.push(this.answerService.updateScore(+answerId, score));
    }

    Promise.all(updates.map(req => req.toPromise())).then(() => {
      alert('تم حفظ الدرجات.');
    });
  }
  isCorrect(answer: any): boolean {
  const correct = answer.question.options.find((o: any) => o.is_correct)?.option_text;
  return answer.answer === correct;
}

}
