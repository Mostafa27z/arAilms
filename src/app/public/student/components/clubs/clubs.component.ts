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
  clubMembers: any[] = [];
  page: number = 1;
  userId: number = 0;

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
    this.clubService.getAllClubs(this.page).subscribe({
      next: (res) => {
        this.clubs = res.data;
      },
      error: (err) => {
        console.error('Error loading clubs:', err);
      }
    });
  }

  loadMyClubMemberships(): void {
    this.clubMemberService.getMyMemberships(this.userId).subscribe({
      next: (res) => {
        this.clubMembers = res.data;
      },
      error: (err) => {
        console.error('Error loading club memberships:', err);
      }
    });
  }

  isMember(clubId: number): boolean {
    return this.clubMembers.some(member => member.club_id === clubId);
  }

  joinClub(club: any): void {
    const data = {
      club_id: club.id,
      student_id: this.userId
    };

    this.clubMemberService.joinClub(data).subscribe({
      next: () => {
        alert('Joined successfully!');
        this.loadMyClubMemberships();
      },
      error: (err) => {
        console.error('Error joining club:', err);
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
