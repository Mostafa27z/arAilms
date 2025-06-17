import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonService } from '../../../../services/lesson.service';
import { CourseService } from '../../../../services/course.service';
import { CommonModule } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';

interface LessonFormData {
  course_id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddLessonComponent implements OnInit {
  lessonForm!: FormGroup;
  courses: any[] = [];
  teacherId: number = 0;
  selectedFile: File | null = null;
  uploadProgress: number = 0;

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getTeacherId();
    this.loadCourses();
    this.initForm();
  }

  getTeacherId() {
    let id: any = localStorage.getItem('roleid');
    if (id) {
      this.teacherId = parseInt(JSON.parse(id));
      console.log('Teacher ID:', this.teacherId);
    }
  }

  initForm() {
    this.lessonForm = this.fb.group({
  course_id: ['', Validators.required],
  title: ['', [Validators.required, Validators.minLength(3)]],
  content: ['', [Validators.required, Validators.minLength(10)]],
});

  }

  loadCourses() {
    this.courseService.getCoursesByTeacher(this.teacherId).subscribe({
      next: (res) => {
        this.courses = res.data;
      },
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitLesson() {
    if (this.lessonForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const formData = new FormData();
    formData.append('course_id', this.lessonForm.value.course_id);
    formData.append('title', this.lessonForm.value.title);
    formData.append('content', this.lessonForm.value.content);
    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile);
    }

    this.lessonService.createLesson(formData, (progress) => {
      this.uploadProgress = progress;
    }).subscribe({
      next: () => {
        alert('Lesson created successfully');
        this.lessonForm.reset();
        this.selectedFile = null;
        this.uploadProgress = 0;
      },
      error: (err) => {
        console.error(err);
        alert('Error creating lesson');
      }
    });
  }
}
