import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
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
  loading: boolean = false; // ✅ جديد

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true; // ✅ إبدأ التحميل
    this.studentService.getAllStudents(this.searchTerm, this.currentPage).subscribe({
      next: (res) => {
        this.students = res.data;
        this.filteredStudents = res.data;
        this.pagination = res.pagination;
        this.loading = false; // ✅ انتهى التحميل
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadStudents(); // ✅ أعِد تحميل النتائج عند البحث
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.loadStudents();
    }
  }

  deleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.loading = true;
      this.studentService.deleteStudent(studentId).subscribe({
        next: () => {
          alert('Student deleted successfully');
          this.loadStudents();
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting student');
          this.loading = false;
        }
      });
    }
  }
}
