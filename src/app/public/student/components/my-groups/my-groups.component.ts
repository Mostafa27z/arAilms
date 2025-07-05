import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {
  myGroups: any[] = [];
  loading = true;
  studentId = 0;

  // لكل جروب مفتاح يدل إذا كنا بنحمل جلساته
  loadingSessions: { [groupId: number]: boolean } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const roleid = localStorage.getItem('roleid');
    this.studentId = roleid ? JSON.parse(roleid) : 0;

    this.http.get(`${environment.url}/groups/available/${this.studentId}`).subscribe({
      next: (res: any) => {
        const allGroups = res.data || [];

        // ✅ تصفية المجموعات التي العضوية فيها approved فقط
        this.myGroups = allGroups.filter((group: any) => group.membership_status === 'approved');
console.log(allGroups)
        this.loading = false;

        this.myGroups.forEach(group => {
          this.loadingSessions[group.id] = true;
          this.http.get(`${environment.url}/group-sessions/by-group/${group.id}`).subscribe({
            next: (sessionRes: any) => {
              group.sessions = sessionRes.data || [];
              this.loadingSessions[group.id] = false;
            },
            error: (err) => {
              console.error(`❌ Error loading sessions for group ${group.id}:`, err);
              group.sessions = [];
              this.loadingSessions[group.id] = false;
            }
          });
        });
      },
      error: (err) => {
        console.error('❌ Error loading groups:', err);
        this.loading = false;
      }
    });
  }
}
