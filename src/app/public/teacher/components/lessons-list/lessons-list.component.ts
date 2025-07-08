import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../../../services/lesson.service';
import { CourseService } from '../../../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  templateUrl: './lessons-list.component.html',
  styleUrl: './lessons-list.component.scss',
  imports: [CommonModule, FormsModule,RouterLink ],
})
export class LessonsListComponent implements OnInit {
  courses: any[] = [];
  lessons: any[] = [];
  filteredLessons: any[] = [];
loadingCourses: boolean = false;
loadingLessons: boolean = false;

  selectedCourseId: string = '';
  searchTerm: string = '';
  teacherId: number = 0;

  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTeacherId();
    this.loadCourses();
    this.loadLessons(this.teacherId);
  }

  getTeacherId() {
    let id: any = localStorage.getItem('roleid');
    if (id) {
      this.teacherId = parseInt(JSON.parse(id));
    }
  }
deleteLesson(lesson: any) {
  if (confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
    this.lessonService.deleteLesson(lesson.id).subscribe({
      next: () => {
        this.lessons = this.lessons.filter(l => l.id !== lesson.id);
        this.applyFilter();
      },
      error: (err) => console.error(err)
    });
  }
}
viewQuestions(lesson: any) {
  this.router.navigate(['/teacher/lesson', lesson.id, 'questions']);
}

  loadCourses() {
  this.loadingCourses = true;
  this.courseService.getCoursesByTeacher(this.teacherId).subscribe({
    next: (res) => {
      this.courses = res.data;
      this.loadingCourses = false;
    },
    error: (err) => {
      console.error(err);
      this.loadingCourses = false;
    },
  });
}

loadLessons(id: any) {
  this.loadingLessons = true;
  this.lessonService.getLessonsByTeacher(id).subscribe({
    next: (res) => {
      this.lessons = res.data;
      this.applyFilter();
      this.loadingLessons = false;
    },
    error: (err) => {
      console.error(err);
      this.loadingLessons = false;
    },
  });
}


  applyFilter() {
    this.filteredLessons = this.lessons.filter((lesson) => {
      const matchesCourse =
        !this.selectedCourseId || lesson.course_id == this.selectedCourseId;
      const matchesSearch =
        !this.searchTerm ||
        lesson.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lesson.content.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCourse && matchesSearch;
    });
  }
  getCourseTitle(courseId: number): string {
  const course = this.courses.find(c => c.id === courseId);
  return course ? course.title : 'Unknown Course';
}
downloadAttachment(fileUrl: string) {
  const fullUrl = `${fileUrl}`;
  window.open(fullUrl, '_blank');
}

editLesson(lesson: any) {
  // تقدر هنا تعمل Navigation للصفحة الخاصة بالتعديل مع تمرير ID
  this.router.navigate(['/teacher/editlesson', lesson.id]);
}

}
