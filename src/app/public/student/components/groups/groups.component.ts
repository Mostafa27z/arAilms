import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-student-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class StudentGroupsComponent implements OnInit {
  groups: any[] = [];
  loadingGroups: boolean = true;
  joiningGroupId: number | null = null;
  studentId = 0;

  selectedGroupId: number | null = null;
  selectedGroupTitle: string = '';
  groupSessions: { [groupId: number]: any[] } = {};
  loadingSessions: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const roleid = localStorage.getItem('roleid');
    this.studentId = roleid ? JSON.parse(roleid) : 0;
    this.loadGroups();
  }

  loadGroups() {
    this.loadingGroups = true;
    this.http.get(`${environment.url}/groups/available/${this.studentId}`).subscribe({
      next: (res: any) => {
        this.groups = res.data;
        this.loadingGroups = false;
      },
      error: (err) => {
        console.error('Error loading groups:', err);
        this.loadingGroups = false;
      }
    });
  }

  requestJoin(groupId: number) {
    this.joiningGroupId = groupId;
    this.http.post(`${environment.url}/group-members/request`, {
      student_id: this.studentId,
      group_id: groupId
    }).subscribe({
      next: () => {
        alert('✅ تم إرسال طلب الانضمام.');
        this.loadGroups(); // reload to reflect status
        this.joiningGroupId = null;
      },
      error: (err) => {
        console.error('Error sending join request:', err);
        this.joiningGroupId = null;
      }
    });
  }

  openSessions(groupId: number, groupTitle: string) {
    this.selectedGroupId = groupId;
    this.selectedGroupTitle = groupTitle;

    if (this.groupSessions[groupId]) return;

    this.loadingSessions = true;
    this.http.get(`${environment.url}/group-sessions/by-group/${groupId}`).subscribe({
      next: (res: any) => {
        this.groupSessions[groupId] = res.data;
        this.loadingSessions = false;
      },
      error: (err) => {
        console.error('Error loading sessions:', err);
        this.groupSessions[groupId] = [];
        this.loadingSessions = false;
      }
    });
  }
}
