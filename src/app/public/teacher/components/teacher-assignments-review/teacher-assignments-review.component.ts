import { Component, OnInit } from '@angular/core';
import { StudentSubmissionService } from '../../../../services/student-submission.service';
import { TeacherAssignmentReviewService } from '../../../../services/teacher-assignment-review.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-assignments-review',
  templateUrl: './teacher-assignments-review.component.html',
  styleUrls: ['./teacher-assignments-review.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TeacherAssignmentsReviewComponent implements OnInit {

  submissions: any[] = [];
  filteredSubmissions: any[] = [];

  totalAssignments: number = 0;
  totalSubmissions: number = 0;
  reviewedSubmissions: number = 0;
  pendingReviews: number = 0;
  teacherId: number = 0;

  showReviewModal: boolean = false;
  selectedSubmission: any = null;
  score: number | null = null;
  feedback: string = '';

  // Filters
  studentSearch: string = '';
  assignmentSearch: string = '';
  reviewFilter: string = 'all';

  loading: boolean = false;
  savingReview: boolean = false;

  constructor(
    private submissionService: StudentSubmissionService,
    private reviewService: TeacherAssignmentReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeacherIdAndSubmissions();
  }

  loadTeacherIdAndSubmissions(): void {
    const id = localStorage.getItem('roleid');
    if (id) {
      try {
        this.teacherId = parseInt(JSON.parse(id));
      } catch (e) {
        console.error('Error parsing teacher ID from localStorage', e);
        return;
      }
      this.loadSubmissions();
    } else {
      console.error('Teacher ID not found in localStorage');
    }
  }

  loadSubmissions(): void {
    this.loading = true;
    this.submissionService.getSubmissionsByTeacher(this.teacherId).subscribe({
      next: (res) => {
        this.submissions = res.data || [];
        this.filteredSubmissions = [...this.submissions];
        this.calculateStats();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  calculateStats(): void {
    const assignmentsSet = new Set(this.submissions.map(s => s.assignment_id));
    this.totalAssignments = assignmentsSet.size;
    this.totalSubmissions = this.submissions.length;
    this.reviewedSubmissions = this.submissions.filter(s => s.reviews?.length > 0).length;
    this.pendingReviews = this.totalSubmissions - this.reviewedSubmissions;
  }

  applyFilters(): void {
    this.filteredSubmissions = this.submissions.filter(sub => {
      const studentMatch = sub.student_name.toLowerCase().includes(this.studentSearch.toLowerCase());
      const assignmentMatch = sub.assignment_title.toLowerCase().includes(this.assignmentSearch.toLowerCase());

      let reviewMatch = true;
      if (this.reviewFilter === 'reviewed') {
        reviewMatch = sub.reviews?.length > 0;
      } else if (this.reviewFilter === 'not_reviewed') {
        reviewMatch = sub.reviews?.length === 0;
      }

      return studentMatch && assignmentMatch && reviewMatch;
    });
  }

  openReview(submission: any): void {
    this.selectedSubmission = submission;
    const existingReview = submission.reviews?.[0];
    this.score = existingReview ? existingReview.score : null;
    this.feedback = existingReview ? existingReview.feedback : '';
    this.showReviewModal = true;
  }

  submitReview(): void {
    if (!this.selectedSubmission || this.score === null) return;

    const reviewData = {
      submission_id: this.selectedSubmission.id,
      teacher_id: this.teacherId,
      feedback: this.feedback,
      score: this.score
    };

    this.savingReview = true;
    this.reviewService.storeOrUpdateReview(reviewData).subscribe({
      next: () => {
        this.savingReview = false;
        this.closeReview();
        this.loadSubmissions();
      },
      error: (err) => {
        console.error('Error saving review', err);
        this.savingReview = false;
      }
    });
  }

  closeReview(): void {
    this.showReviewModal = false;
    this.score = null;
    this.feedback = '';
    this.selectedSubmission = null;
  }
}
