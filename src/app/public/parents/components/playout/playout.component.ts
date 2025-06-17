import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PasideComponent } from '../paside/paside.component';
import { ParentService } from '../../../../services/parent.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playout',
  standalone: true,
  imports: [RouterOutlet, PasideComponent, CommonModule, FormsModule],
  templateUrl: './playout.component.html',
  styleUrl: './playout.component.scss'
})
export class PlayoutComponent implements OnInit {

  students: any[] = [];
  selectedStudentId: number | null = null;
  parentId: number = 0;

  constructor(private parentService: ParentService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('user');
    this.parentId = storedId ? JSON.parse(storedId).id : 0;

    if (this.parentId) {
      this.loadStudents();
    }

    const storedStudentId = localStorage.getItem('selectedStudentId');
    this.selectedStudentId = storedStudentId ? +storedStudentId : null;
  }

  loadStudents() {
    this.parentService.getMyStudents(this.parentId).subscribe(res => {
      this.students = res.data;

    });
  }

  onStudentChange() {
    localStorage.setItem('selectedStudentId', String(this.selectedStudentId));
    location.reload(); // هنا بعد الاختيار نعمل refresh علشان كل باقي الصفحات تعتمد على الطالب المختار
  }
}
