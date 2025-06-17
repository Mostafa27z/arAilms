import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../services/teacher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tdashboard',
  templateUrl: './tdashboard.component.html',
  styleUrls: ['./tdashboard.component.scss'],
  imports:[CommonModule]
})
export class TdashboardComponent implements OnInit {
  totalCourses: number = 0;
  totalStudents: number = 0;
  pendingAssignments: number = 0;
  students: any[] = [];
  unreviewedAssignments: any[] = [];
  isLoading = true;

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    let teacherId:any = localStorage.getItem('roleid');
    
      
    
    
    if (teacherId) {
      teacherId = parseInt(JSON.parse(teacherId))
      console.log(teacherId)
     this.teacherService.getDashboardSummary(teacherId).subscribe({
      next: (data) => {
        this.totalCourses = data.total_courses;
        this.totalStudents = data.total_students;
        this.pendingAssignments = data.pending_assignments;
        this.students = data.students;
        this.unreviewedAssignments = data.unreviewedAssignments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
    }
   
  }
}
