import { Component } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../services/student.service';
import { LessonService } from '../../../../services/lesson.service';
import { CourseEnrollmentService } from '../../../../services/course-enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CourseComponent {
  studentId: any = false;
  courses: any[] = [];
  myCourses: any[] = [];
  lessons: any[] = [];
  selectedCourseTitle: string = '';
  enrollments: any[] = [];

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
        const parsed = JSON.parse(user);
        this.studentId = parsed;
        if (this.studentId) {
          this.loadStudentCourses(this.studentId);
          this.loadStudentEnrollments(this.studentId);
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

  loadCourses(): void {
    this.serv.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data.data;
        console.log('courses:', this.courses);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  loadStudentCourses(id: any): void {
    this.enrollmentService.getEnrollmentsByStudent(id).subscribe({
      next: (data) => {
        this.myCourses = data.data;
        console.log('Student courses:', this.myCourses);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  loadStudentEnrollments(studentId: any): void {
    this.enrollmentService.getEnrollmentsByStudent(studentId).subscribe({
      next: (data) => {
        this.enrollments = data.data;
        console.log('Enrollments:', this.enrollments);
      },
      error: (err) => {
        console.error('Error loading enrollments:', err);
      }
    });
  }

  getEnrollmentStatus(courseId: number): string {
    const enrollment = this.enrollments.find(e => e.course_id === courseId);
    if (enrollment) {
      if (enrollment.status === 'approved') return 'Enrolled';
      if (enrollment.status === 'pending') return 'Pending';
    }
    return 'Not Enrolled';
  }

  requestEnrollment(course: any): void {
    const payload = {
      student_id: this.studentId,
      course_id: course.id
    };

    this.enrollmentService.enrollStudent(payload).subscribe({
      next: () => {
        alert('Enrollment request submitted!');
        this.loadStudentEnrollments(this.studentId); // reload after request
      },
      error: (err) => {
        console.error('Error submitting enrollment request:', err);
      }
    });
  }

  viewCourse(course: any): void {
    this.router.navigate(['/student/courses', course.id]);
  }
}
