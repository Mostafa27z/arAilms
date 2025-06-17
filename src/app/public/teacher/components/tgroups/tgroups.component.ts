import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../../services/club.service';
import { ClubMemberService } from '../../../../services/club-member.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tgroups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tgroups.component.html',
  styleUrls: ['./tgroups.component.scss']
})
export class TgroupsComponent implements OnInit {

  clubs: any[] = [];
  filteredClubs: any[] = [];
  searchTerm: string = '';

  // Modal variables
  showClubModal: boolean = false;
  isEditMode: boolean = false;
  selectedClub: any = null;
  clubForm = { name: '', description: '' };

  // Delete Modal
  showDeleteModal: boolean = false;

  // Members Modal
  showMembersModal: boolean = false;
  clubMembers: any[] = [];

  constructor(private clubService: ClubService, private memberService: ClubMemberService) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  loadClubs() {
    this.clubService.getAllClubs().subscribe({
      next: (res) => {
        this.clubs = res.data;
        this.filteredClubs = [...this.clubs];
      },
      error: (err) => console.error(err)
    });
  }

  filterClubs() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClubs = this.clubs.filter(club => club.name.toLowerCase().includes(term));
  }

  openAddClub() {
    this.isEditMode = false;
    this.clubForm = { name: '', description: '' };
    this.showClubModal = true;
  }

  openEditClub(club: any) {
    this.isEditMode = true;
    this.selectedClub = club;
    this.clubForm = { name: club.name, description: club.description };
    this.showClubModal = true;
  }

  saveClub() {
    if (this.isEditMode) {
      this.clubService.updateClub(this.selectedClub.id, this.clubForm).subscribe(() => {
        this.loadClubs();
        this.closeClubModal();
      });
    } else {
      this.clubService.createClub(this.clubForm).subscribe(() => {
        this.loadClubs();
        this.closeClubModal();
      });
    }
  }

  openDeleteClub(club: any) {
    this.selectedClub = club;
    this.showDeleteModal = true;
  }

  deleteClub() {
    this.clubService.deleteClub(this.selectedClub.id).subscribe(() => {
      this.loadClubs();
      this.closeDeleteModal();
    });
  }

  openMembers(club: any) {
    this.selectedClub = club;
    this.memberService.getMembers(club.id).subscribe(res => {
      this.clubMembers = res.data;
      console.log(this.clubMembers)
      this.showMembersModal = true;
    });
  }

  closeClubModal() { this.showClubModal = false; }
  closeDeleteModal() { this.showDeleteModal = false; }
  closeMembersModal() { this.showMembersModal = false; }
}
