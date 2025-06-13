import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../services/exam.service';
import { AssignmentService } from '../../../../services/assignment.service';
import { StudentSubmissionService } from '../../../../services/student-submission.service'; // ✅ هنا بنضيف السيرفس الجديد
import { formatDate } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
interface TestScore {
  name: string;
  score: string;
  date: string;
}

interface Assignment {
  name: string;
  dueDate: string;
  status: string;
  progress: number;
  action: string;
}

@Component({
  selector: 'app-tests',
  imports: [CommonModule, FormsModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss'
})
export class TestsComponent implements OnInit {
   // نستورد الفورمات من Angular

selectedAssignment: any = null;
submissionText: string = '';

isPastDue(dueDate: string): boolean {
  const today = new Date();
  return new Date(dueDate) < today;
}

// فتح نافذة تسليم
// openSubmissionModal(assignment: any) {
//   this.selectedAssignment = assignment;
//   this.submissionText = ''; // reset on open

//   // هنا ممكن تفتح مودال أو نافذة حسب نظامك
//   const confirmed = prompt('Enter your submission text:', '');
//   if (confirmed !== null) {
//     this.submissionText = confirmed;
//     this.submitAssignment();
//   }
// }

// تنفيذ التسليم
// submitAssignment() {
//   if (!this.selectedAssignment) return;

//   const payload = {
//     student_id: this.studentId,
//     assignment_id: this.selectedAssignment.id,
//     submission_text: this.submissionText
//   };

//   this.submissionService.submitAssignment(payload).subscribe({
//     next: (data) => {
//       alert('Submission Successful');
//       // بعد التسليم نحدث حالة التسليم لهذا التكليف
//       this.selectedAssignment.submission_status = 'Submitted';
//       this.selectedAssignment.submitted_at = new Date().toISOString();
//     },
//     error: (err) => {
//       console.error('Submission error:', err);
//       alert('Submission failed');
//     }
//   });
// }

  studentId: any = 0;

  constructor(
    private serv: ExamService, 
    private ser: AssignmentService, 
    private submissionService: StudentSubmissionService  // ✅ نضيف السيرفس هنا
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('roleid');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        this.studentId = parsed;

        if (this.studentId) {
          console.log(this.studentId);
          this.loadStudentResults(this.studentId);
          this.loadStudentAssignments(this.studentId);
        } else {
          console.error('Student ID is missing in localStorage user');
        }
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    } else {
      console.error('No user found in localStorage');
    }
  }

  exams: any[] = [];

  loadStudentResults(id: any): void {
    console.log(id);
    this.serv.stdResult(id).subscribe({
      next: (data) => {
        this.exams = data.data;
        console.log('Student results:', this.exams);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  ass: any[] = [];

  loadStudentAssignments(id: any): void {
    console.log(id);
    this.ser.stdResult(id).subscribe({
      next: (data) => {
        this.ass = data.data;
        console.log('Student assignments:', this.ass);

        // ✅ هنا بعد ما نحمل الـ assignments نجيب حالة كل واحد
        this.ass.forEach((assignment: any) => {
          this.checkSubmission(assignment);
        });

      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  // ✅ تابع جديد لجلب حالة التسليم من السيرفر
  checkSubmission(assignment: any): void {
    const payload = {
      student_id: this.studentId,
      assignment_id: assignment.id
    };

    this.submissionService.checkSubmissionStatus(payload.student_id, payload.assignment_id).subscribe({
      next: (data) => {
        // نضيف حالة التسليم مباشرة للـ assignment نفسه
        assignment.submission_status = data.submitted ? 'Submitted' : 'Not Submitted';
        assignment.submission_id = data.submission_id;
        assignment.submitted_at = data.submitted_at;
      },
      error: (err) => {
        console.error('Error checking submission:', err);
        assignment.submission_status = 'Unknown';
      }
    });
  }

  // باقي بياناتك الثابتة زي ما هي ✅
  assignments: Assignment[] = [
    { name: 'Math Homework', dueDate: '2023-10-15', status: 'Submitted', progress: 5, action: 'View' },
    { name: 'Science Project', dueDate: '2023-10-20', status: 'Not Submitted', progress: 5, action: 'Submit Now' },
    { name: 'History Essay', dueDate: '2023-10-25', status: 'In Progress', progress: 5, action: 'Edit' },
    { name: 'Art Assignment', dueDate: '2023-10-30', status: 'Submitted', progress: 5, action: 'View' },
    { name: 'English Worksheet', dueDate: '2023-10-18', status: 'Not Submitted', progress: 5, action: 'Submit Now' }
  ];

  tests: TestScore[] = [
    { name: 'Math Test', score: '95%', date: '08/15/2023' },
    { name: 'Science Exam', score: '88%', date: '08/22/2023' },
    { name: 'History Quiz', score: '92%', date: '09/01/2023' }
  ];
//   selectedAssignment: any = null;
// submissionText: string = '';

selectedFile: File | null = null;
showModal: boolean = false;

openSubmissionModal(assignment: any) {
  this.selectedAssignment = assignment;
  this.submissionText = '';
  this.selectedFile = null;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.selectedFile = null;
  this.submissionText = '';
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}

submitAssignment() {
  if (!this.selectedAssignment) return;

  const formData = new FormData();

  // ✅ لأول مرة تقديم نضيف البيانات الأساسية
  if (this.selectedAssignment.submission_status !== 'Submitted') {
    formData.append('student_id', this.studentId.toString());
    formData.append('assignment_id', this.selectedAssignment.id.toString());
  }

  formData.append('submission_text', this.submissionText);
  if (this.selectedFile) {
    formData.append('file_path', this.selectedFile);
  }

  if (this.selectedAssignment.submission_status === 'Submitted' && this.selectedAssignment.submission_id) {
    this.submissionService.updateAssignment(this.selectedAssignment.submission_id, formData).subscribe({
      next: () => {
        alert('Re-Submission Successful');
        this.selectedAssignment.submission_status = 'Submitted';
        this.selectedAssignment.submitted_at = new Date().toISOString();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error updating submission:', err);
        alert('Update failed');
      }
    });
  } else {
    this.submissionService.submitAssignment(formData).subscribe({
      next: () => {
        alert('Submission Successful');
        this.selectedAssignment.submission_status = 'Submitted';
        this.selectedAssignment.submitted_at = new Date().toISOString();
        this.closeModal();
      },
      error: (err) => {
        console.error('Submission error:', err);
        alert('Submission failed');
      }
    });
  }
}



}
