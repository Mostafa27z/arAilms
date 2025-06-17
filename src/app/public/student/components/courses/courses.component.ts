import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { StudentService } from '../../../../services/student.service';
import { LessonService } from '../../../../services/lesson.service';
import { CourseEnrollmentService } from '../../../../services/course-enrollment.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CourseComponent implements OnInit {
  studentId: number | null = null;
  courses: any[] = [];
  myCourses: any[] = [];
  lessons: any[] = [];
  selectedCourseTitle: string = '';
  enrollments: any[] = [];

  loadingCourses = true;
  loadingMyCourses = true;
  loadingEnrollments = true;

  constructor(
    private serv: CourseService,
    private ser: StudentService,
    private lessonService: LessonService,
    private enrollmentService: CourseEnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();

    const user = localStorage.getItem('roleid');
    if (user) {
      try {
        this.studentId = JSON.parse(user);
        if (this.studentId) {
          this.loadStudentCourses(this.studentId);
          this.loadStudentEnrollments(this.studentId);
        }
      } catch (e) {
        console.error('❌ Failed to parse studentId from localStorage:', e);
      }
    }
  }

  loadCourses(): void {
    this.loadingCourses = true;
    this.serv.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data.data;
        this.loadingCourses = false;
      },
      error: (err) => {
        console.error('❌ Error loading courses:', err);
        this.loadingCourses = false;
      }
    });
  }

  loadStudentCourses(id: number): void {
    this.loadingMyCourses = true;
    this.enrollmentService.getEnrollmentsByStudent(id).subscribe({
      next: (data) => {
        this.myCourses = data.data.filter((e: any) => e.status === 'approved');
        this.loadingMyCourses = false;
      },
      error: (err) => {
        console.error('❌ Error loading my courses:', err);
        this.loadingMyCourses = false;
      }
    });
  }

  loadStudentEnrollments(id: number): void {
    this.loadingEnrollments = true;
    this.enrollmentService.getEnrollmentsByStudent(id).subscribe({
      next: (data) => {
        this.enrollments = data.data;
        this.loadingEnrollments = false;
      },
      error: (err) => {
        console.error('❌ Error loading enrollments:', err);
        this.loadingEnrollments = false;
      }
    });
  }

  getEnrollmentStatus(courseId: number): string {
    const enrollment = this.enrollments.find(e =>
      e.course?.id === courseId || e.course_id === courseId
    );
    if (enrollment) {
      if (enrollment.status === 'approved') return 'Enrolled';
      if (enrollment.status === 'pending') return 'Pending';
    }
    return 'Not Enrolled';
  }

  requestEnrollment(course: any): void {
    const payload = {
      student_id: this.studentId!,
      course_id: course.id
    };
    this.enrollmentService.enrollStudent(payload).subscribe({
      next: () => {
        alert('Enrollment request submitted!');
        this.loadStudentEnrollments(this.studentId!);
        this.loadStudentCourses(this.studentId!);
      },
      error: (err) => {
        console.error('❌ Error submitting enrollment request:', err);
      }
    });
  }

  viewCourse(course: any): void {
    this.router.navigate(['/student/courses', course.id]);
  }
}

