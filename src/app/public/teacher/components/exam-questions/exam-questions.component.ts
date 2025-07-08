import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ExamQuestionService } from '../../../../services/exam-question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-questions',
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ExamQuestionsComponent implements OnInit {
  examId!: number;
  questions: any[] = [];
  loading = false;
  showForm = false;
  isEditMode = false;
  selectedQuestionId: number | null = null;

  questionForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionService: ExamQuestionService
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadQuestions();
  }

  initForm() {
  this.questionForm = this.fb.group({
    question_text: ['', Validators.required],
    type: ['mcq', Validators.required],
    options: this.fb.array([])
  });

  // راقب تغيير نوع السؤال
  this.questionForm.get('type')?.valueChanges.subscribe(type => {
    this.updateOptionValidators(type);
  });
}
updateOptionValidators(type: string) {
  this.options.controls.forEach(group => {
    const optionTextControl = group.get('option_text');

    if (type === 'mcq') {
      optionTextControl?.setValidators([Validators.required]);
    } else {
      optionTextControl?.clearValidators();
    }

    optionTextControl?.updateValueAndValidity();
  });
}


  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  addOption() {
  const type = this.questionForm.get('type')?.value;
  const validators = type === 'mcq' ? [Validators.required] : [];

  this.options.push(this.fb.group({
    option_text: ['', validators],
    is_correct: [false]
  }));
}


  removeOption(index: number) {
    this.options.removeAt(index);
  }

  markCorrect(index: number) {
    this.options.controls.forEach((opt, i) => {
      opt.get('is_correct')?.setValue(i === index);
    });
  }

  loadQuestions() {
    this.loading = true;
    this.questionService.getByExam(this.examId).subscribe({
      next: (res) => {
        this.questions = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openForm(question: any = null) {
    this.showForm = true;
    this.isEditMode = !!question;
    this.options.clear();

    if (question) {
      this.selectedQuestionId = question.id;
      this.questionForm.patchValue({
        question_text: question.question_text,
        type: question.type
      });

      if (question.type === 'mcq' && question.options) {
        question.options.forEach((opt: any) => {
          this.options.push(this.fb.group({
            option_text: [opt.option_text, Validators.required],
            is_correct: [opt.is_correct]
          }));
        });
      }
    } else {
      this.selectedQuestionId = null;
      this.questionForm.reset({ type: 'mcq' });
      this.options.clear();
      this.addOption();
      this.addOption();
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedQuestionId = null;
    this.questionForm.reset({ type: 'mcq' });
    this.options.clear();
  }

  saveQuestion() {
    const isMcq = this.questionForm.value.type === 'mcq';
    if (this.questionForm.invalid || (isMcq && this.options.length < 2)) return;

    const data = {
      exam_id: this.examId,
      question_text: this.questionForm.value.question_text,
      type: this.questionForm.value.type,
      options: isMcq ? this.questionForm.value.options : []
    };

    const request = this.isEditMode
      ? this.questionService.update(this.selectedQuestionId!, data)
      : this.questionService.create(data);

    request.subscribe({
      next: () => {
        this.loadQuestions();
        this.closeForm();
      }
    });
  }

  deleteQuestion(id: number) {
    if (confirm("هل أنت متأكد من حذف هذا السؤال؟")) {
      this.questionService.delete(id).subscribe(() => this.loadQuestions());
    }
  }
}
