import { Component, OnInit } from '@angular/core';  
import { CourseService } from '../../../../services/course.service';  
import { LessonService } from '../../../../services/lesson.service';  
import { CourseEnrollmentService } from '../../../../services/course-enrollment.service';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-acourses',  
  templateUrl: './acourses.component.html',  
  styleUrls: ['./acourses.component.scss'],  
  standalone: true,  
  imports:[CommonModule]  
})  
export class AcoursesComponent implements OnInit {  
  
  courses: any[] = [];  
  totalCourses: number = 0;
  totalEnrollments: number = 0;
  pendingEnrollments: number = 0;
  
  constructor(  
    private courseService: CourseService,  
    private lessonService: LessonService,  
    private enrollmentService: CourseEnrollmentService  
  ) {}  
  
  ngOnInit(): void {  
    this.loadCoursesWithDetails();  
    this.loadEnrollmentStats();
  }  
  
  loadCoursesWithDetails() {  
    this.courseService.getAllCourses().subscribe(res => {  
      const courses = res.data ?? res;  
      this.totalCourses = courses.length;

      this.courses = courses.map((course: any) => ({  
        id: course.id,  
        title: course.title,  
        teacher: course.teacher ?? 'N/A',  
        lessonsCount: 0,  
        enrollmentsCount: 0  
      }));  
  
      this.courses.forEach(course => {  
        this.lessonService.getLessonsByCourse(course.id).subscribe(lessonsRes => {  
          course.lessonsCount = lessonsRes?.data?.length ?? lessonsRes.length;  
        });  
  
        this.enrollmentService.getEnrollments().subscribe(enrollmentsRes => {  
          const count = enrollmentsRes.data?.filter((e: any) =>  
            e.course.id === course.id && e.status === 'approved' 
          ).length ?? 0;  
          course.enrollmentsCount = count;  
        });  
      });  
    });  
  }
deleteCourse(courseId: number) {
  const confirmDelete = confirm("Are you sure you want to delete this course?");
  if (!confirmDelete) return;

  this.courseService.deleteCourse(courseId).subscribe(() => {
    // بعد الحذف نعمل إعادة تحميل للكورسات
    this.loadCoursesWithDetails();
  }, (error) => {
    console.error("Failed to delete course:", error);
    alert("Failed to delete course.");
  });
}

  loadEnrollmentStats() {
    this.enrollmentService.getEnrollments().subscribe(res => {
      const enrollments = res.data ?? res;
      this.totalEnrollments = enrollments.length;
      this.pendingEnrollments = enrollments.filter((e: any) => e.status === 'pending').length;
    });
  }
}
