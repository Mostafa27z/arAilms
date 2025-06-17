import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpEvent, HttpEventType } from '@angular/common/http';
import { ExamService } from '../../../../services/exam.service';
import { AssignmentService } from '../../../../services/assignment.service';
import { StudentSubmissionService } from '../../../../services/student-submission.service';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss'
})
export class TestsComponent implements OnInit {
  studentId: any = 0;
  exams: any[] = [];
  ass: any[] = [];

  loadingAssignments = true;
  loadingExams = true;
  checkingSubmissions = false;
  submitting = false;

  selectedAssignment: any = null;
  submissionText: string = '';
  selectedFile: File | null = null;
  showModal: boolean = false;
  uploadProgress: number = 0;

  constructor(
    private serv: ExamService,
    private ser: AssignmentService,
    private submissionService: StudentSubmissionService
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('roleid');
    if (user) {
      try {
        this.studentId = JSON.parse(user);
        if (this.studentId) {
          this.loadStudentResults(this.studentId);
          this.loadStudentAssignments(this.studentId);
        }
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }

  loadStudentResults(id: any): void {
    this.loadingExams = true;
    this.serv.stdResult(id).subscribe({
      next: (data) => {
        this.exams = data.data;
        this.loadingExams = false;
      },
      error: () => (this.loadingExams = false)
    });
  }

  loadStudentAssignments(id: any): void {
    this.loadingAssignments = true;
    this.ser.stdResult(id).subscribe({
      next: (data) => {
        this.ass = data.data;
        this.loadingAssignments = false;
        this.checkingSubmissions = true;
        let completed = 0;
        this.ass.forEach((assignment: any) => {
          this.checkSubmission(assignment);
          completed++;
          if (completed === this.ass.length) this.checkingSubmissions = false;
        });
      },
      error: () => (this.loadingAssignments = false)
    });
  }

  checkSubmission(assignment: any): void {
    const payload = {
      student_id: this.studentId,
      assignment_id: assignment.id
    };

    this.submissionService.checkSubmissionStatus(payload.student_id, payload.assignment_id).subscribe({
      next: (data) => {
        assignment.submission_status = data.submitted ? 'Submitted' : 'Not Submitted';
        assignment.submission_id = data.submission_id;
        assignment.submitted_at = data.submitted_at;
      },
      error: () => {
        assignment.submission_status = 'Unknown';
      }
    });
  }

  isPastDue(dueDate: string): boolean {
    return new Date(dueDate) < new Date();
  }

  openSubmissionModal(assignment: any): void {
    this.selectedAssignment = assignment;
    this.submissionText = '';
    this.selectedFile = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedFile = null;
    this.submissionText = '';
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  submitAssignment(): void {
  if (!this.selectedAssignment) return;

  const formData = new FormData();
  const isUpdate = this.selectedAssignment.submission_status === 'Submitted' && this.selectedAssignment.submission_id;

  if (!isUpdate) {
    formData.append('student_id', this.studentId.toString());
    formData.append('assignment_id', this.selectedAssignment.id.toString());
  }

  formData.append('submission_text', this.submissionText);
  if (this.selectedFile) {
    formData.append('file_path', this.selectedFile);
  }

  this.submitting = true;
  let completed = false;

  const finalize = () => {
    this.selectedAssignment.submission_status = 'Submitted';
    this.selectedAssignment.submitted_at = new Date().toISOString();
    this.submitting = false;
    this.uploadProgress = 0;
    this.closeModal();
  };

  const handleEvent = (event: HttpEvent<any>) => {
    if (event.type === HttpEventType.UploadProgress && event.total) {
      this.uploadProgress = Math.round((event.loaded / event.total) * 100);
    }

    if (event.type === HttpEventType.Response && !completed) {
      completed = true;
      finalize();
    }
  };

  const handleError = (err: any) => {
    console.error('❌ Submission error:', err);
    this.submitting = false;
    this.uploadProgress = 0;
  };

  if (isUpdate) {
    this.submissionService.updateAssignment(this.selectedAssignment.submission_id, formData).subscribe({
      next: handleEvent,
      error: handleError
    });
  } else {
    this.submissionService.submitAssignment(formData).subscribe({
      next: handleEvent,
      error: handleError
    });
  }
}

}
