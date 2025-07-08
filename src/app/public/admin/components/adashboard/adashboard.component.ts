import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adashboard',
  templateUrl: './adashboard.component.html',
  styleUrls: ['./adashboard.component.scss'],
  imports: [CommonModule]
})
export class AdashboardComponent implements OnInit {

  totalStudents = 0;
  activeCourses = 0;
  instructors = 0;

  recentEnrollments: any[] = [];
  popularCourses: any[] = [];

  // Loaders
  loadingStudents = true;
  loadingCourses = true;
  loadingInstructors = true;
  loadingEnrollments = true;
  loadingPopular = true;

  baseUrl: any = environment.url;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTotalStudents();
    this.loadActiveCourses();
    this.loadInstructors();
    this.loadRecentEnrollments();
    this.loadPopularCourses();
  }

  loadTotalStudents() {
    this.loadingStudents = true;
    this.http.get<any>(`${this.baseUrl}/students`).subscribe(res => {
      this.totalStudents = res.data.length;
      this.loadingStudents = false;
    });
  }

  loadActiveCourses() {
    this.loadingCourses = true;
    this.http.get<any>(`${this.baseUrl}/courses`).subscribe(res => {
      this.activeCourses = res.data.length;
      this.loadingCourses = false;
    });
  }

  loadInstructors() {
    this.loadingInstructors = true;
    this.http.get<any>(`${this.baseUrl}/teachers`).subscribe(res => {
      this.instructors = res.data.length;
      this.loadingInstructors = false;
    });
  }

  loadRecentEnrollments() {
    this.loadingEnrollments = true;
    this.http.get<any>(`${this.baseUrl}/enrollments`).subscribe(res => {
      const approved = res.data.filter((e: any) => e.status === 'approved');
      const sorted = approved.sort((a: any, b: any) =>
        b.enrolled_at > a.enrolled_at ? 1 : -1
      );
      this.recentEnrollments = sorted.slice(0, 5);
      this.loadingEnrollments = false;
    });
  }

  loadPopularCourses() {
    this.loadingPopular = true;
    this.http.get<any>(`${this.baseUrl}/enrollments`).subscribe(res => {
      const approvedEnrollments = res.data.filter((e: any) => e.status === 'approved');
      const courseCount: any = {};

      approvedEnrollments.forEach((enroll: any) => {
        const courseId = enroll.course.id;
        const title = enroll.course.title;
        const description = enroll.course.description;

        if (!courseCount[courseId]) {
          courseCount[courseId] = {
            title: title,
            description: description,
            count: 1
          };
        } else {
          courseCount[courseId].count += 1;
        }
      });

      const sortedCourses = Object.entries(courseCount)
        .sort((a: any, b: any) => b[1].count - a[1].count)
        .slice(0, 5);

      this.popularCourses = sortedCourses.map(([_, courseData]: any) => ({
        title: courseData.title,
        description: courseData.description,
        enrolledStudents: courseData.count
      }));

      this.loadingPopular = false;
    });
  }
}
