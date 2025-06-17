import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../services/lesson.service';
import { CourseService } from '../../../../services/course.service';
import { CommonModule } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edit-lesson',
  standalone: true,
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditLessonComponent implements OnInit {
  lessonForm!: FormGroup;
  courses: any[] = [];
  teacherId: number = 0;
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  lessonId: number = 0;
  existingAttachment: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getTeacherId();
    this.initForm();
    this.lessonId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.loadLesson(this.lessonId);
    this.loadCourses();
  }

  getTeacherId() {
    let id: any = localStorage.getItem('roleid');
    if (id) {
      this.teacherId = parseInt(JSON.parse(id));
    }
  }

  initForm() {
    this.lessonForm = this.fb.group({
      course_id: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  loadCourses() {
    this.courseService.getCoursesByTeacher(this.teacherId).subscribe({
      next: (res) => { this.courses = res.data; },
      error: (err) => console.error(err)
    });
  }

  loadLesson(id: number) {
    this.lessonService.getLesson(id).subscribe({
      next: (res) => {
        const lesson = res.data;
        this.lessonForm.patchValue({
        course_id: lesson.course_id ? String(lesson.course_id) : '',
        title: lesson.title ?? '',
        content: lesson.content ?? ''
      });

        this.existingAttachment = lesson.attachment;
      },
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateLesson() {
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

    this.lessonService.updateLesson(this.lessonId, formData, (progress) => {
      this.uploadProgress = progress;
    }).subscribe({
      next: () => {
        alert('Lesson updated successfully');
        this.router.navigate(['/teacher/lessons']);
      },
      error: (err) => {
        console.error(err);
        alert('Error updating lesson');
      }
    });
  }

  downloadAttachment() {
    if (this.existingAttachment) {
      window.open(`http://localhost:8000${this.existingAttachment}`, '_blank');
    }
  }
}
