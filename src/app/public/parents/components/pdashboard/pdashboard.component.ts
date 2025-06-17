import { Component, OnInit } from '@angular/core';
import { ParentService } from '../../../../services/parent.service';
import { CourseEnrollmentService } from '../../../../services/course-enrollment.service';
import { StudentSubmissionService } from '../../../../services/student-submission.service';
import { AssignmentService } from '../../../../services/assignment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdashboard.component.html',
  styleUrl: './pdashboard.component.scss'
})
export class PdashboardComponent implements OnInit {
  students: any[] = [];
  parentId: number = 0;
  loadingStudents = true;

  constructor(
    private parentService: ParentService,
    private enrollmentService: CourseEnrollmentService,
    private submissionService: StudentSubmissionService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('user');
    this.parentId = storedId ? JSON.parse(storedId).id : 0;

    if (this.parentId) {
      this.loadStudents();
    }
  }

  loadStudents() {
    this.loadingStudents = true;
    this.parentService.getMyStudents(this.parentId).subscribe(res => {
      const students = res.data;
      this.students = students.map((student: any) => ({
        ...student,
        totalCourses: 0,
        submittedAssignments: 0,
        pendingAssignments: 0,
        loading: {
          courses: true,
          submissions: true,
          assignments: true
        }
      }));

      this.students.forEach(student => {
        // Load courses
        this.enrollmentService.getEnrollmentsByStudent(student.id).subscribe(enrollmentsRes => {
          student.totalCourses = enrollmentsRes.data?.length ?? enrollmentsRes.length;
          student.loading.courses = false;
        });

        // Load submissions
        this.submissionService.getSubmissionsByStudent(student.id).subscribe(subRes => {
          student.submittedAssignments = subRes.data?.length ?? subRes.length;
          student.loading.submissions = false;
        });

        // Load assignments
        this.assignmentService.getAssignmentsByStudent(student.id).subscribe(assignRes => {
          const totalAssignments = assignRes.data?.length ?? assignRes.length;
          student.pendingAssignments = totalAssignments - student.submittedAssignments;
          student.loading.assignments = false;
        });
      });

      this.loadingStudents = false;
    });
  }
}
