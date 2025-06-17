import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adashboard',
  templateUrl: './adashboard.component.html',
  styleUrls: ['./adashboard.component.scss'],
  imports:[CommonModule]
})
export class AdashboardComponent implements OnInit {

  totalStudents = 0;
  activeCourses = 0;
  totalRevenue = 45678; // ثابت حالياً
  instructors = 0;
  recentEnrollments: any[] = [];
  popularCourses: any[] = [];
baseUrl:any = environment.url;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTotalStudents();
    this.loadActiveCourses();
    this.loadInstructors();
    this.loadRecentEnrollments();
    this.loadPopularCourses();
  }

  loadTotalStudents() {
    this.http.get<any>(`${this.baseUrl}/students`).subscribe(res => {
      this.totalStudents = res.data.length;
    });
  }

  loadActiveCourses() {
    this.http.get<any>(`${this.baseUrl}/courses`).subscribe(res => {
      this.activeCourses = res.data.length;
    });
  }

  loadInstructors() {
    this.http.get<any>(`${this.baseUrl}/teachers`).subscribe(res => {
      this.instructors = res.data.length;
    });
  }

  loadRecentEnrollments() {
    this.http.get<any>(`${this.baseUrl}/enrollments`).subscribe(res => {
      const sorted = res.data.sort((a:any,b:any) => (b.enrolled_at > a.enrolled_at ? 1 : -1));
      this.recentEnrollments = sorted.slice(0, 5);
    });
  }

  loadPopularCourses() { 
  this.http.get<any>(`${this.baseUrl}/enrollments`).subscribe(res => { 
    const courseCount: any = {}; 

    res.data.forEach((enroll: any) => { 
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

    // Sort descending by count
    const sortedCourses = Object.entries(courseCount)
      .sort((a:any, b:any) => b[1].count - a[1].count)
      .slice(0,5);

    this.popularCourses = sortedCourses.map(([courseId, courseData]: any) => ({ 
      title: courseData.title, 
      description: courseData.description, 
      enrolledStudents: courseData.count
    }));

    console.log(this.popularCourses); 
  }); 
}

}
