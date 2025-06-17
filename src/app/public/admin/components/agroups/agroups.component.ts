import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../../services/club.service';
import { ClubMemberService } from '../../../../services/club-member.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agroups',
  templateUrl: './agroups.component.html',
  styleUrls: ['./agroups.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AgroupsComponent implements OnInit {
searchText: string = '';

  groups: any[] = [];
  totalGroups: number = 0;
  totalMembers: number = 0;

  constructor(
    private clubService: ClubService,
    private memberService: ClubMemberService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }
filteredGroups() {
  if (!this.searchText.trim()) return this.groups;

  const lowerSearch = this.searchText.toLowerCase();

  return this.groups.filter(group =>
    group.name.toLowerCase().includes(lowerSearch)
  );
}

  loadGroups() {
    this.clubService.getAllClubs().subscribe(clubsRes => {
      const clubs = clubsRes.data ?? clubsRes;
      this.totalGroups = clubs.length;
      this.groups = clubs.map((club: any) => ({
        id: club.id,
        name: club.name,
        description: club.description,
        membersCount: 0
      }));

      // نجيب عدد الأعضاء لكل مجموعة
      this.groups.forEach(group => {
        this.memberService.getMembers(group.id).subscribe(membersRes => {
          group.membersCount = membersRes?.data?.length ?? membersRes.length;
        });
      });

      // نجيب إجمالي الأعضاء في كل الكلابس مرة واحدة
      this.memberService.getAllMembers().subscribe(membersRes => {
        const members = membersRes.data ?? membersRes;
        this.totalMembers = members.length;
      });
    });
  }

  deleteGroup(groupId: number) {
    const confirmDelete = confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    this.clubService.deleteClub(groupId).subscribe(() => {
      this.loadGroups();
    }, (error) => {
      console.error("Failed to delete group:", error);
      alert("Failed to delete group.");
    });
  }
}
