import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../../services/question.service';
import { QuestionOptionService } from '../../../../services/question-option.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-questions',
  standalone: true,
  templateUrl: './lesson-questions.component.html',
  styleUrl: './lesson-questions.component.scss',
  imports: [CommonModule, FormsModule]
})
export class LessonQuestionsComponent implements OnInit {

  lessonId: number = 0;
  questions: any[] = [];

  // سؤال جديد
  showAddQuestionModal = false;
  questionForm = { question_text: '' };

  // خيار جديد
  showAddOptionModal = false;
  optionForm = { option_text: '', is_correct: false };
  currentQuestionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private optionService: QuestionOptionService
  ) {}

  ngOnInit(): void {
    this.lessonId = parseInt(this.route.snapshot.paramMap.get('lessonId') || '0');
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestionsByLesson(this.lessonId).subscribe({
      next: (res) => {
        this.questions = res.data;
        this.loadOptionsForAll();
      },
      error: (err) => console.error(err)
    });
  }

  loadOptionsForAll() {
    this.questions.forEach((question, index) => {
      this.optionService.getOptionsByQuestion(question.id).subscribe({
        next: (res) => {
          this.questions[index].options = res.data;
        },
        error: (err) => console.error(err)
      });
    });
  }

  // سؤال
  openAddQuestionModal() {
    this.questionForm = { question_text: '' };
    this.showAddQuestionModal = true;
  }

  saveNewQuestion() {
    const data:any = { ...this.questionForm, lesson_id: this.lessonId, type: 'mcq' }; // كله MCQ
    this.questionService.createQuestion(data).subscribe({
      next: () => {
        this.showAddQuestionModal = false;
        this.loadQuestions();
      },
      error: (err) => console.error(err)
    });
  }

  deleteQuestion(questionId: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(questionId).subscribe({
        next: () => this.loadQuestions(),
        error: (err) => console.error(err)
      });
    }
  }

  // خيارات
  openAddOptionModal(questionId: number) {
    this.currentQuestionId = questionId;
    this.optionForm = { option_text: '', is_correct: false };
    this.showAddOptionModal = true;
  }

  saveNewOption() {
    const data = { ...this.optionForm, question_id: this.currentQuestionId };
    this.optionService.createOption(data).subscribe({
      next: () => {
        this.showAddOptionModal = false;
        this.loadQuestions();
      },
      error: (err) => console.error(err)
    });
  }

  // deleteOption(optionId: number) {
  //   if (confirm('Are you sure you want to delete this option?')) {
  //     this.optionService.deleteOption(optionId).subscribe({
  //       next: () => this.loadQuestions(),
  //       error: (err) => console.error(err)
  //     });
  //   }
  // }
  // when radio button clicked (only one correct option)
setCorrectOption(question: any, selectedOption: any) {
  question.options.forEach((opt: any) => {
    opt.is_correct = (opt === selectedOption);
  });
}

// add option
addOption(question: any) {
  if (!question.newOptionText?.trim()) return;

  const newOption = {
    question_id: question.id,
    option_text: question.newOptionText,
    is_correct: false
  };

  this.optionService.createOption(newOption).subscribe({
    next: (res) => {
      question.options.push(res.data);
      question.newOptionText = '';
    }
  });
}

// delete option
deleteOption(optionId: number) {
  this.optionService.deleteOption(optionId).subscribe({
    next: () => {
      this.questions.forEach(q => {
        q.options = q.options.filter((o: { id: number; }) => o.id !== optionId);
      });
    }
  });
}

// save question (update question title + options)
saveQuestion(question: any) {
  // update question title
  this.questionService.updateQuestion(question.id, { title: question.title }).subscribe();

  // loop options to update them
  question.options.forEach((option: any) => {
    this.optionService.updateOption(option.id, {
      option_text: option.option_text,
      is_correct: option.is_correct
    }).subscribe();
  });

  alert("Saved Successfully ✅");
}

}
