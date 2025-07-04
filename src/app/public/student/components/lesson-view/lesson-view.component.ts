import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../services/lesson.service';
import { QuestionService } from '../../../../services/question.service';
import { StudentAnswerService } from '../../../../services/student-answer.service';
import { ProgressService } from '../../../../services/progress.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LessonViewComponent implements OnInit {
  lessonId: number = 0;
  studentId: number = 0;
  lesson: any = {};
  questions: any[] = [];
  answers: any = {};

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private questionService: QuestionService,
    private answerService: StudentAnswerService,
    private progressService: ProgressService
  ) {}

  submitted = false;
score = 0;
previousAnswers: { [questionId: number]: number } = {};
retaking = false;

ngOnInit(): void {
  this.lessonId = Number(this.route.snapshot.paramMap.get('lessonId'));
  const user = localStorage.getItem('roleid');
  this.studentId = user ? JSON.parse(user) : 0;

  if (this.lessonId) {
    this.loadLesson();
    this.loadQuestions();
    this.markLessonStarted();
    this.loadPreviousAnswers();
  }
}

loadPreviousAnswers() {
  this.answerService.getAnswersByLessonAndStudent(this.lessonId, this.studentId).subscribe({
    next: (res:any) => {
      res.data.forEach((ans: any) => {
        this.previousAnswers[ans.question_id] = ans.selected_option_id;
        this.answers[ans.question_id] = ans.selected_option_id;
      });
      this.submitted = true;
      this.calculateScore();
    },
    error: err => console.error(err)
  });
}

calculateScore() {
  let count = 0;
  this.questions.forEach(q => {
    const selected = this.answers[q.id];
    const correct = q.options.find((o: any) => o.is_correct)?.id;
    if (selected && selected == correct) count++;
  });
  this.score = count;
}

submitAnswers() {
  let correct = 0;
  const requests: any[] = [];

  this.questions.forEach(q => {
    const selectedOption = this.answers[q.id];
    const optionObject = q.options.find((opt: { id: any }) => opt.id == selectedOption);
    const isCorrect = optionObject ? optionObject.is_correct : false;

    if (isCorrect) correct++;

    const payload = {
      student_id: this.studentId,
      question_id: q.id,
      selected_option_id: selectedOption,
      is_correct: isCorrect
    };

    requests.push(this.answerService.submitAnswer(payload).toPromise());
  });

  Promise.all(requests).then(() => {
    this.score = correct;
    this.submitted = true;
    this.markLessonComplete();
  });
}

retakeTest() {
  this.submitted = false;
  this.answers = {};
  this.score = 0;
}


  loadLesson() {
    this.lessonService.getLesson(this.lessonId).subscribe({
      next: res => this.lesson = res.data,
      error: err => console.error(err)
    });
  }

  loadQuestions() {
    this.questionService.getQuestionsByLesson(this.lessonId).subscribe({
      next: res => this.questions = res.data,
      error: err => console.error(err)
    });
  }

  markLessonStarted() {
    const progress = {
      student_id: this.studentId,
      lesson_id: this.lessonId,
      status: 'in_progress',
      progress_percentage: 50,
      last_accessed: this.formatDateForMySQL(new Date())
    };

    this.progressService.markProgress(progress).subscribe({
      next: () => console.log("Progress set to 50%"),
      error: err => console.error(err)
    });
  }

  // submitAnswers() {
  //   let correct = 0;
  //   const requests: any[] = [];

  //   this.questions.forEach(q => {
  //     const selectedOption = this.answers[q.id];
  //     const optionObject = q.options.find((opt: { id: any; }) => opt.id == selectedOption);
  //     const isCorrect = optionObject ? optionObject.is_correct : false;

  //     if (isCorrect) correct++;

  //     const payload = {
  //       student_id: this.studentId,
  //       question_id: q.id,
  //       selected_option_id: selectedOption,
  //       is_correct: isCorrect
  //     };

  //     requests.push(this.answerService.submitAnswer(payload).toPromise());
  //   });

  //   Promise.all(requests).then(() => {
  //     alert(`أجبت بشكل صحيح على ${correct}/${this.questions.length}`);
  //     this.markLessonComplete();
  //   });
  // }

  markLessonComplete() {
    const progress = {
      student_id: this.studentId,
      lesson_id: this.lessonId,
      status: 'completed',
      progress_percentage: 100,
      completed_at: this.formatDateForMySQL(new Date())
    };

    this.progressService.markProgress(progress).subscribe({
      next: () => console.log("Progress updated to 100%"),
      error: err => console.error(err)
    });
  }

  formatDateForMySQL(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
