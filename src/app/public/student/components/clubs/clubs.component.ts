import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../../services/club.service';
import { ClubMemberService } from '../../../../services/club-member.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClubChatService } from '../../../../services/club-chat.service';

@Component({
  selector: 'app-clubs',
  imports: [CommonModule],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.scss'
})
export class ClubsComponent implements OnInit {
  clubs: any[] = [];
  clubMembers: { club_id: number; status: string }[] = [];
  page: number = 1;
  userId: number = 0;

  loadingClubs: boolean = false;
  loadingMemberships: boolean = false;
  joining: boolean = false;

  constructor(
    private clubService: ClubService,
    private clubMemberService: ClubMemberService,
    private clubChatService: ClubChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('roleid');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        this.userId = parsed;
      } catch (e) {
        console.error('Error parsing user ID from localStorage:', e);
      }
    }

    this.loadClubs();
    this.loadMyClubMemberships();
  }

  loadClubs(): void {
    this.loadingClubs = true;
    this.clubService.getAllClubs(this.page).subscribe({
      next: (res) => {
        this.clubs = res.data;
        this.loadingClubs = false;
      },
      error: (err) => {
        console.error('Error loading clubs:', err);
        this.loadingClubs = false;
      }
    });
  }

  loadMyClubMemberships(): void {
    this.loadingMemberships = true;
    this.clubMemberService.getMyMemberships(this.userId).subscribe({
      next: (res) => {
        this.clubMembers = res.data;
        this.loadingMemberships = false;
      },
      error: (err) => {
        console.error('Error loading club memberships:', err);
        this.loadingMemberships = false;
      }
    });
  }

  isMember(clubId: number): boolean {
  return this.clubMembers.some(m => m.club_id === clubId && m.status === 'approved');
}

hasPendingRequest(clubId: number): boolean {
  return this.clubMembers.some(m => m.club_id === clubId && m.status === 'pending');
}


 joinClub(club: any): void {
  const data = {
    club_id: club.id,
    student_id: this.userId,
    status: 'pending' // نضيف الحالة هنا
  };

  this.joining = true;
  this.clubMemberService.joinClub(data).subscribe({
    next: () => {
      this.joining = false;
      this.loadMyClubMemberships(); // إعادة تحميل العضويات
    },
    error: (err) => {
      console.error('Error joining club:', err);
      this.joining = false;
    }
  });
}


  openChat(club: any): void {
    if (!this.isMember(club.id)) {
      alert('You must join the club first!');
      return;
    }
    this.router.navigate(['student/clubs', club.id, 'chat']);
  }
}

