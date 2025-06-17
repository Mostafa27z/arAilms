import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  loading = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res.data ?? res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load courses', err);
        this.loading = false;
      }
    });
  }
}
