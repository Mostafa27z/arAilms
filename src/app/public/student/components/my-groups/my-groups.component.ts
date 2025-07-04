import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

// my-groups.component.ts
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const roleid = localStorage.getItem('roleid');
    this.studentId = roleid ? JSON.parse(roleid) : 0;

    this.http.get(`${environment.url}/groups/student/${this.studentId}`).subscribe((res: any) => {
      this.myGroups = res.data;
      this.loading = false;

      // Load sessions for each group
      this.myGroups.forEach(group => {
        this.http.get(`${environment.url}/group-sessions/by-group/${group.id}`).subscribe((sessionRes: any) => {
          group.sessions = sessionRes.data || [];
        });
      });
    });
  }
}

