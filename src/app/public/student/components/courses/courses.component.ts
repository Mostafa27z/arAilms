import { Component } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../services/student.service';
import { LessonService } from '../../../../services/lesson.service'; // ✅ نضيف LessonService
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
  lessons: any[] = [];  // ✅ نجهز المتغير الخاص بالـ lessons
  selectedCourseTitle: string = ''; // عشان نعرض اسم الكورس عند عرض دروسه

  constructor(
    private serv: CourseService,
    private ser: StudentService,
    private lessonService: LessonService , // ✅ Inject LessonService
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
        console.log(' courses:', this.courses);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  loadStudentCourses(id: any): void {
    this.ser.stdcourses(id).subscribe({
      next: (data) => {
        this.myCourses = data.data;
        console.log('Student courses:', this.myCourses);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  // ✅ لما يضغط على View Course
  // viewCourse(course: any): void {
  //   this.selectedCourseTitle = course.title;
  //   this.lessonService.getLessonsByCourse(course.id).subscribe({
  //     next: (data) => {
  //       this.lessons = data.data;
  //       console.log('Lessons:', this.lessons);
  //     },
  //     error: (err) => {
  //       console.error('Error loading lessons:', err);
  //     }
  //   });
  // }
  viewCourse(course: any): void {
    this.router.navigate(['/student/courses', course.id]);
  }
}
