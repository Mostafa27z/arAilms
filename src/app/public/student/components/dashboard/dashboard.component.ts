import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ExamService } from '../../../../services/exam.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

  constructor(
    private serv: StudentService,
    private ser: ExamService
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
          this.loadExams();
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
