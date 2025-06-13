import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { StudentService } from '../../../../services/student.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../../services/exam.service';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientJsonpModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true
})
export class DashboardComponent implements OnInit {
  
  studentId: number | null = null;

name = '';

 // Replace this with actual logic to get current student ID
  courses: any[] = [];

  constructor(private serv: StudentService , private ser:ExamService ) {}

  ngOnInit(): void {
    
    const user = localStorage.getItem('roleid');
    const n = localStorage.getItem('user');
    if(n){
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
    this.loadStudentCourses();
  }

  loadStudentCourses(): void {
    console.log(this.studentId);
    this.serv.stdcourses(this.studentId).subscribe({
      next: (data) => {
        this.courses = data.data;
        console.log('Student courses:', this.courses);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }
  exams:any[] = [];
  loadExams(): void {
    
    this.ser.upcoming().subscribe({
      next: (data) => {
        this.exams = data.data;
        console.log('Student exams:', this.exams);
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }
}
