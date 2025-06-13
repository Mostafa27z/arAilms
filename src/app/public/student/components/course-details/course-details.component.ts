import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../services/lesson.service';
import { CourseService } from '../../../../services/course.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  imports:[CommonModule]
})
export class CourseDetailsComponent implements OnInit {
  courseId: number = 0;
  lessons: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

    this.loadLessons();
  }

  loadLessons(): void {
    this.lessonService.getLessonsByCourse(this.courseId).subscribe({
      next: (res) => this.lessons = res.data,
      error: (err) => console.error(err)
    });
  }

  openLesson(lesson: any) {
    this.router.navigate(['student/lessons', lesson.id]);
  }
}
