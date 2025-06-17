import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CourseEnrollmentService } from '../../../../services/course-enrollment.service';

@Component({
  selector: 'app-tcourses',
  standalone: true,
  templateUrl: './tcourses.component.html',
  styleUrl: './tcourses.component.scss',
  imports: [CommonModule, FormsModule]
})
export class TcoursesComponent implements OnInit {
  courses: any[] = [];

  showAddModal = false;
  showEditModal = false;

  newCourse: any = {};
  editCourse: any = {};

  selectedFile: File | null = null;
  editSelectedFile: File | null = null;

  uploadProgress: number = 0;
  editUploadProgress: number = 0;

  teacherId: number = 0;
loadingCourses = false;
loadingEnrollments = false;
submittingCourse = false;

  constructor(private courseService: CourseService,private courseEnrollmentService: CourseEnrollmentService) {}

  ngOnInit(): void {
    this.getTeacherId();
    this.loadCourses();
    this.loadEnrollments(this.teacherId);
  }

  getTeacherId() {
    let id: any = localStorage.getItem('roleid');
    if (id) {
      this.teacherId = parseInt(JSON.parse(id));
      console.log('Teacher ID:', this.teacherId);
    }
  }

  loadCourses() {
  this.loadingCourses = true;
  this.courseService.getCoursesByTeacher(this.teacherId).subscribe({
    next: (res) => {
      this.courses = res.data;
      this.loadingCourses = false;
    },
    error: (err) => {
      console.error(err);
      this.loadingCourses = false;
    }
  });
}


  openAddModal() {
    this.newCourse = {};
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addCourse() {
  this.submittingCourse = true;
  const formData = new FormData();
  formData.append('title', this.newCourse.title);
  formData.append('description', this.newCourse.description ?? '');
  formData.append('teacher_id', this.teacherId.toString());
  if (this.selectedFile) {
    formData.append('thumbnail', this.selectedFile);
  }

  this.courseService.createCourse(formData, (progress) => {
    this.uploadProgress = progress;
  }).subscribe({
    next: () => {
      this.submittingCourse = false;
      this.closeAddModal();
      this.loadCourses();
    },
    error: (err) => {
      console.error(err);
      this.submittingCourse = false;
    }
  });
}


  openEditModal(course: any) {
    this.editCourse = { ...course };
    this.editSelectedFile = null;
    this.editUploadProgress = 0;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onEditFileSelected(event: any) {
    this.editSelectedFile = event.target.files[0];
  }

 updateCourse() {
  this.submittingCourse = true;
  const formData = new FormData();
  formData.append('title', this.editCourse.title);
  formData.append('description', this.editCourse.description ?? '');
  formData.append('teacher_id', this.teacherId.toString());
  if (this.editSelectedFile) {
    formData.append('thumbnail', this.editSelectedFile);
  }

  this.courseService.updateCourse(this.editCourse.id, formData, (progress) => {
    this.editUploadProgress = progress;
  }).subscribe({
    next: () => {
      this.submittingCourse = false;
      this.closeEditModal();
      this.loadCourses();
    },
    error: (err) => {
      console.error(err);
      this.submittingCourse = false;
    }
  });
}


  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.loadCourses();
        },
        error: (err) => console.error(err)
      });
    }
  }
  pendingEnrollments: any[] = [];
rejectedEnrollments: any[] = [];
loadEnrollments(id: any) {
  this.loadingEnrollments = true;
  this.courseEnrollmentService.getEnrollmentsByTeacher(id).subscribe({
    next: (res) => {
      const allEnrollments = res.data;
      this.pendingEnrollments = allEnrollments.filter((e: any) => e.status === 'pending');
      this.rejectedEnrollments = allEnrollments.filter((e: any) => e.status === 'rejected');
      this.loadingEnrollments = false;
    },
    error: (err) => {
      console.error(err);
      this.loadingEnrollments = false;
    }
  });
}

changeEnrollmentStatus(enrollmentId: number, newStatus: string) {
    this.courseEnrollmentService.updateEnrollmentStatus(enrollmentId, newStatus).subscribe({
      next: () => {
        this.loadEnrollments(this.teacherId);  // Reload after update
        this.loadCourses();
      },
      error: (err) => console.error(err)
    });
  }
}
