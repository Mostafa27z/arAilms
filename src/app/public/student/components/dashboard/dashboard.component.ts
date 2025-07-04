import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ExamService } from '../../../../services/exam.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AssignmentService } from '../../../../services/assignment.service';
import { ProgressService } from '../../../../services/progress.service';
import { LessonService } from '../../../../services/lesson.service';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientJsonpModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  studentId: number | null = null;
  name = '';
  courses: any[] = [];
  exams: any[] = [];
  loadingCourses = true;
  loadingExams = true;
  progress: { [lessonId: number]: number } = {};
submittedAssignments: any[] = [];
pendingAssignments: any[] = [];
overdueAssignments: any[] = [];


  constructor(
    private serv: StudentService,
    private ser: ExamService,
    private ass:AssignmentService,
     private prog:ProgressService,
    private less: LessonService
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('roleid');
    const n = localStorage.getItem('user');
    if (n) {
      this.name = JSON.parse(n).name;
    }

    if (user) {
      try {
        const parsed = JSON.parse(user);
        this.studentId = parsed;

        if (this.studentId) {
        this.loadStudentCourses();
        this.calculateCourseProgress(this.studentId);
        this.loadExams();
        this.loadProgress();
        this.loadAssignments();
      }
 else {
          console.error('Student ID is missing in localStorage user');
        }
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    } else {
      console.error('No user found in localStorage');
    }
  }

  loadStudentCourses(): void {
  this.loadingCourses = true;
  this.serv.stdcourses(this.studentId).subscribe({
    next: (data: any) => {
      const allEnrollments = data.data;

      // فقط الكورسات المعتمدة
      this.courses = allEnrollments.filter((enroll: any) => enroll.status === 'approved')
                                   .map((enroll: any) => enroll.course);

      console.log('✅ Approved Courses:', this.courses);
      this.loadingCourses = false;
    },
    error: (err: any) => {
      console.error('❌ Error loading courses:', err);
      this.loadingCourses = false;
    }
  });
}
loadAssignments() {
  this.ass.getAssignmentsByStudent(this.studentId!).subscribe({
    next: (res: any) => {
      const assignments = res.data;

      const now = new Date();

      this.submittedAssignments = assignments.filter((a: any) => a.submitted);
      this.pendingAssignments = assignments.filter((a: any) => !a.submitted && new Date(a.due_date) > now);
      this.overdueAssignments = assignments.filter((a: any) => !a.submitted && new Date(a.due_date) <= now);
    },
    error: err => console.error('Error loading assignments', err)
  });
}
courseProgressMap: { [courseId: number]: number } = {};

calculateCourseProgress(courseId: number): void {
  if (!this.studentId) return;

  this.serv.getCoursesWithProgress(this.studentId).subscribe({
    next: (res: any) => {
      const coursesWithProgress = res.data || [];

      coursesWithProgress.forEach((course: any) => {
        this.courseProgressMap[course.course_id] = course.progress;
      });
    },
    error: err => {
      console.error('❌ Error loading course progress', err);
    }
  });
}






loadProgress() {
  this.prog.getAllProgress(this.studentId!).subscribe({
    next: (res: any) => {
      const list = res.data;
      list.forEach((p: any) => {
        this.progress[p.lesson_id] = p.progress_percentage;
      });
    },
    error: (err: any) => console.error('Error loading progress', err)
  });
}

  loadExams(): void {
    this.loadingExams = true;
    this.ser.upcoming().subscribe({
      next: (data: any) => {
        this.exams = data.data;
        this.loadingExams = false;
      },
      error: (err: any) => {
        console.error('Error loading exams:', err);
        this.loadingExams = false;
      }
    });
  }
}
