import { Component, OnInit } from '@angular/core';
import { StudentSubmissionService } from '../../../../services/student-submission.service';
import { TeacherAssignmentReviewService } from '../../../../services/teacher-assignment-review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ptests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ptests.component.html',
  styleUrl: './ptests.component.scss'
})
export class PtestsComponent implements OnInit {

  studentId: number | null = null;
  submissions: any[] = [];
  loading = true;

  totalAssignments = 0;
  reviewedAssignments = 0;
  pendingReviews = 0;

  constructor(
    private submissionService: StudentSubmissionService,
    private reviewService: TeacherAssignmentReviewService
  ) {}

  ngOnInit(): void {
    const storedStudent = localStorage.getItem('selectedStudentId');
    this.studentId = storedStudent ? +storedStudent : null;

    if (this.studentId) {
      this.loadData();
    } else {
      this.loading = false;
    }
  }

  selectedReview: any = null;

loadData() {
  this.submissionService.getSubmissionsByStudent(this.studentId!).subscribe(res => {
    this.submissions = res.data ?? res;
    this.totalAssignments = this.submissions.length;

    let reviewedCount = 0;

    const reviewRequests = this.submissions.map((sub: any) => {
      return this.reviewService.getReviewsBySubmission(sub.id).toPromise().then(review => {
        const isReviewed = review && review.length > 0;
        sub.reviewed = isReviewed;
        sub.reviewData = review; // نخزن بيانات الريفيو داخل كل submission
        if (isReviewed) reviewedCount++;
      });
    });

    Promise.all(reviewRequests).then(() => {
      this.reviewedAssignments = reviewedCount;
      this.pendingReviews = this.totalAssignments - this.reviewedAssignments;
      this.loading = false;
    });
  });
}

openReview(submission: any) {
  if (submission.reviewed) {
    this.selectedReview = submission.reviewData[0];  // ناخد أول ريفيو (لأن الريفيو بترجع array)
  } else {
    this.selectedReview = null;
  }
}

closeReview() {
  this.selectedReview = null;
}

}
