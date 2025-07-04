import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../services/lesson.service';
import { ProgressService } from '../../../../services/progress.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  imports: [CommonModule]
})
export class CourseDetailsComponent implements OnInit {
  courseId: number = 0;
  lessons: any[] = [];
  studentId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private progressService: ProgressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    const user = localStorage.getItem('roleid');
    this.studentId = user ? JSON.parse(user) : 0;

    this.loadLessonsWithProgress();
  }

  loadLessonsWithProgress(): void {
    this.lessonService.getLessonsByCourse(this.courseId).subscribe({
      next: (res) => {
        this.lessons = res.data;

        // بعد تحميل الدروس، نحمل التقدم ونربطه
        this.progressService.getAllProgress(this.studentId).subscribe({
          next: (progressRes: any) => {
          const progressMap = new Map(
            progressRes.data.map((p: any) => [p.lesson_id, p.progress_percentage])
          );


            this.lessons = this.lessons.map(lesson => ({
              ...lesson,
              progress: progressMap.get(lesson.id) || 0
            }));
          },
          error: err => console.error(err)
        });
      },
      error: err => console.error(err)
    });
  }

  openLesson(lesson: any) {
    this.router.navigate(['student/lessons', lesson.id]);
  }
}
