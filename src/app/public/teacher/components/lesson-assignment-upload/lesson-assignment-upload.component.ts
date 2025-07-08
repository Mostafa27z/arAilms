import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentService } from '../../../../services/assignment.service';
import { LessonService } from '../../../../services/lesson.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-assignment-upload',
  standalone: true,
  templateUrl: './lesson-assignment-upload.component.html',
  styleUrls: ['./lesson-assignment-upload.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LessonAssignmentUploadComponent implements OnInit {
  uploadForm!: FormGroup;
  lessons: any[] = [];
  assignments: any[] = [];
  teacherId: number = 0;

  loading: boolean = false;
  loadingLessons: boolean = false;
  loadingAssignments: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';
  fileToUpload: File | null = null;

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      lesson_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      due_date: ['', Validators.required],
      attachment: [null]
    });

    const roleId = localStorage.getItem('roleid');
    if (roleId) {
      this.teacherId = parseInt(JSON.parse(roleId));
      this.loadLessons();
      this.loadAssignments();
    }
  }

  loadLessons() {
    this.loadingLessons = true;
    this.lessonService.getLessonsByTeacher(this.teacherId).subscribe({
      next: (res) => {
        this.lessons = res.data || [];
        this.loadingLessons = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingLessons = false;
      }
    });
  }

  loadAssignments() {
    this.loadingAssignments = true;
    this.assignmentService.getAssignmentsByTeacher(this.teacherId).subscribe({
      next: (res) => {
        this.assignments = res.data || [];
        this.loadingAssignments = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingAssignments = false;
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
    }
  }

  submitAssignment() {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('lesson_id', this.uploadForm.value.lesson_id);
    formData.append('title', this.uploadForm.value.title);
    formData.append('description', this.uploadForm.value.description || '');
    formData.append('due_date', this.uploadForm.value.due_date);

    if (this.fileToUpload) {
      formData.append('attachment', this.fileToUpload);
    }

    this.assignmentService.createAssignment(formData).subscribe({
      next: () => {
        this.successMessage = '✅ تم رفع المهمة بنجاح';
        this.uploadForm.reset();
        this.fileToUpload = null;
        this.loadAssignments();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = '❌ حدث خطأ أثناء رفع المهمة';
        this.loading = false;
      }
    });
  }

  deleteAssignment(assignmentId: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذه المهمة؟')) {
      this.loading = true;
      this.assignmentService.deleteAssignment(assignmentId).subscribe({
        next: () => {
          this.successMessage = 'تم حذف المهمة بنجاح ✅';
          this.loadAssignments();
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'حدث خطأ أثناء حذف المهمة ❌';
          this.loading = false;
        }
      });
    }
  }
}
