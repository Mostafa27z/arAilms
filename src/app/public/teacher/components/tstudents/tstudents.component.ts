import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { CourseEnrollmentService } from '../../../../services/course-enrollment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tstudents',
  templateUrl: './tstudents.component.html',
  styleUrl: './tstudents.component.scss',
  imports: [FormsModule, CommonModule]
})
export class TstudentsComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  pagination: any;
  searchTerm: string = '';
  currentPage: number = 1;
  loading: boolean = false;

  teacherId: number = 0;

  // 🆕 بيانات الاشتراكات
  enrollments: any[] = [];
  filteredEnrollments: any[] = [];
  enrollmentSearch: string = '';

  constructor(
    private studentService: StudentService,
    private enrollmentService: CourseEnrollmentService
  ) {}

  ngOnInit(): void {
    const roleid = localStorage.getItem('roleid');
    this.teacherId = roleid ? JSON.parse(roleid) : 0;

    this.loadStudents();
    this.loadEnrollments();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getAllStudents(this.searchTerm, this.currentPage).subscribe({
      next: (res) => {
        this.students = res.data;
        this.filteredStudents = res.data;
        this.pagination = res.pagination;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  loadEnrollments(): void {
    this.enrollmentService.getEnrollmentsByTeacher(this.teacherId).subscribe({
      next: (res) => {
        // filter only approved
        this.enrollments = res.data.filter((e: any) => e.status === 'approved');
        this.filteredEnrollments = this.enrollments;
        console.log(this.filteredEnrollments)
      },
      error: (err) => {
        console.error('Error loading enrollments:', err);
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadStudents();
  }

  onEnrollmentSearch(): void {
    const term = this.enrollmentSearch.toLowerCase();
    this.filteredEnrollments = this.enrollments.filter((e: any) =>
      (e.student?.name?.toLowerCase().includes(term) || '') ||
      (e.course?.title?.toLowerCase().includes(term) || '')
    );
  }
deleteEnrollment(id: number): void {
  if (confirm('هل أنت متأكد من حذف هذا الاشتراك؟')) {
    this.loading = true;
    this.enrollmentService.deleteEnrollment(id).subscribe({
      next: () => {
        alert('تم حذف الاشتراك بنجاح');
        this.loadEnrollments(); // إعادة تحميل الاشتراكات بعد الحذف
        this.loading = false;
      },
      error: (err) => {
        console.error('خطأ أثناء حذف الاشتراك:', err);
        alert('حدث خطأ أثناء حذف الاشتراك');
        this.loading = false;
      }
    });
  }
}

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.loadStudents();
    }
  }

  deleteStudent(studentId: number): void {
    if (confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      this.loading = true;
      this.studentService.deleteStudent(studentId).subscribe({
        next: () => {
          alert('تم حذف الطالب بنجاح');
          this.loadStudents();
        },
        error: (err) => {
          console.error(err);
          alert('حدث خطأ أثناء الحذف');
          this.loading = false;
        }
      });
    }
  }
}
