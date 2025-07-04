import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

// groups.component.ts
@Component({
  selector: 'app-student-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class StudentGroupsComponent implements OnInit {
  groups: any[] = [];
  loading = true;
  joining = false;
  studentId = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const roleid = localStorage.getItem('roleid');
    this.studentId = roleid ? JSON.parse(roleid) : 0;

    this.http.get(`${environment.url}/groups/available/${this.studentId}`).subscribe((res: any) => {
      this.groups = res.data;
      console.log(this.groups)
      this.loading = false;
    });
  }

  requestJoin(groupId: number) {
    this.joining = true;
    this.loading = true;
    this.http.post(`${environment.url}/group-members/request`, {
      student_id: this.studentId,
      group_id: groupId
    }).subscribe(() => {
      alert('تم إرسال طلب الانضمام.');
      this.http.get(`${environment.url}/groups/available/${this.studentId}`).subscribe((res: any) => {
      this.groups = res.data;
      console.log(this.groups)
      this.loading = false;
    });
      this.joining = false;
    });
  }
  selectedGroupId: number | null = null;
selectedGroupTitle: string = '';
groupSessions: { [groupId: number]: any[] } = {};

openSessions(groupId: number, groupTitle: string) {
  this.selectedGroupId = groupId;
  this.selectedGroupTitle = groupTitle;

  if (this.groupSessions[groupId]) return;

  this.http.get(`${environment.url}/group-sessions/by-group/${groupId}`).subscribe({
    next: (res: any) => {
      this.groupSessions[groupId] = res.data;
    },
    error: (err) => {
      console.error('Error loading sessions:', err);
      this.groupSessions[groupId] = [];
    }
  });
}

}

