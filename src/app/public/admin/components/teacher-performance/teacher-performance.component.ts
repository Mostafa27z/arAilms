import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../services/teacher.service';
import { CourseService } from '../../../../services/course.service';
import { LessonService } from '../../../../services/lesson.service';
import { CourseEnrollmentService } from '../../../../services/course-enrollment.service';
import { StudentSubmissionService } from '../../../../services/student-submission.service';
import { TeacherAssignmentReviewService } from '../../../../services/teacher-assignment-review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-performance',
  templateUrl: './teacher-performance.component.html',
  styleUrls: ['./teacher-performance.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TeacherPerformanceComponent implements OnInit {

  teachersData: any[] = [];

  constructor(
    private teacherService: TeacherService,
    private courseService: CourseService,
    private lessonService: LessonService,
    private enrollmentService: CourseEnrollmentService,
    private submissionService: StudentSubmissionService,
    private reviewService: TeacherAssignmentReviewService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getAllTeachers().subscribe((teachersRes: { data: any; }) => {
      const teachers = teachersRes.data ?? teachersRes;
      
      this.teachersData = teachers.map((teacher: any) => ({
        id: teacher.id,
        name: teacher.user.name,
        totalCourses: 0,
        totalLessons: 0,
        pendingEnrollments: 0,
        reviewedAssignments: 0,
        unReviewedAssignments: 0
      }));

      this.teachersData.forEach(teacher => {
        // Courses
        this.courseService.getCoursesByTeacher(teacher.id).subscribe(coursesRes => {
          const courses = coursesRes.data ?? coursesRes;
          teacher.totalCourses = courses.length;

          let lessonCounter = 0;
          courses.forEach((course: any) => {
            this.lessonService.getLessonsByCourse(course.id).subscribe(lessonRes => {
              const lessons = lessonRes.data ?? lessonRes;
              lessonCounter += lessons.length;
              teacher.totalLessons = lessonCounter;
            });
          });

          // Enrollments
          this.enrollmentService.getEnrollmentsByTeacher(teacher.id).subscribe(enrollRes => {
            const enrollments = enrollRes.data ?? enrollRes;
            teacher.pendingEnrollments = enrollments.filter((e: any) => e.status === 'pending').length;
          });
        });

        // Submissions & Reviews
        this.submissionService.getSubmissionsByTeacher(teacher.id).subscribe(subRes => {
          const submissions = subRes.data ?? subRes;

          this.reviewService.getReviewsByTeacher(teacher.id).subscribe(reviewRes => {
            const reviews = reviewRes.data ?? reviewRes;
            const reviewedIds = reviews.map((r: any) => r.submission_id);

            teacher.reviewedAssignments = reviewedIds.length;
            teacher.unReviewedAssignments = submissions.length - reviewedIds.length;
          });
        });
      });
    });
  }
}
