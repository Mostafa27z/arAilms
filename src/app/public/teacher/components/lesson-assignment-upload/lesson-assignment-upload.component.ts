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
  teacherId: number = 0;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

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
    this.lessonService.getLessonsByTeacher(this.teacherId).subscribe({
      next: (res) => {
        this.lessons = res.data || [];
		console.log(res.data)
      },
      error: (err) => console.error(err)
    });
  }

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.uploadForm.patchValue({ attachment: file });
//     }
//   }

  submitAssignment() {
    if (this.uploadForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('lesson_id', this.uploadForm.value.lesson_id);
    formData.append('title', this.uploadForm.value.title);
    formData.append('description', this.uploadForm.value.description || '');
    formData.append('due_date', this.uploadForm.value.due_date);

    const attachment = this.uploadForm.value.attachment;
   if (this.fileToUpload) {
  formData.append('attachment', this.fileToUpload);
}


    this.assignmentService.createAssignment(formData).subscribe({
      next: (res) => {
        this.successMessage = 'Assignment uploaded successfully';
        this.uploadForm.reset();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error uploading assignment';
        this.loading = false;
      }
    });
  }
  assignments: any[] = [];

loadAssignments() {
  this.assignmentService.getAssignmentsByTeacher(this.teacherId).subscribe({
    next: (res) => {
      this.assignments = res.data || [];
	  console.log(res.data)
    },
    error: (err) => console.error(err)
  });
}
fileToUpload: File | null = null;

onFileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.fileToUpload = file;
  }
}

}
