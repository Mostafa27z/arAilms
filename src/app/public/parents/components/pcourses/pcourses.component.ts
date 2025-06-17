import { Component, OnInit } from '@angular/core';
import { CourseEnrollmentService } from '../../../../services/course-enrollment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pcourses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pcourses.component.html',
  styleUrl: './pcourses.component.scss'
})
export class PcoursesComponent implements OnInit {

  studentId: number | null = null;
  courses: any[] = [];
  loading = true;

  constructor(private enrollmentService: CourseEnrollmentService) {}

  ngOnInit(): void {
    const storedStudent = localStorage.getItem('selectedStudentId');
    this.studentId = storedStudent ? +storedStudent : null;

    if (this.studentId) {
      this.loadCourses();
    } else {
      this.loading = false;
    }
  }

  loadCourses() {
    this.enrollmentService.getEnrollmentsByStudent(this.studentId!).subscribe(res => {
      this.courses = res.data.map((enrollment: any) => ({
        courseName: enrollment.course?.title ?? 'N/A',
        instructor: enrollment.course?.description ?? 'N/A',
        // category: enrollment.course?.category?.name ?? 'N/A',
        // schedule: 'Mon, Wed • 9:00 AM', // لو عندك جدول حقيقي ضيفه هنا
        // progress: Math.floor(Math.random() * 100) + 1 // مؤقت لغاية ما نربطه بالـ progress الحقيقي
      }));
      console.log(res.data);
      this.loading = false;
    });
  }
}
