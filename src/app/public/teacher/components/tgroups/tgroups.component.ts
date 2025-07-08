import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../../../services/club.service';
import { ClubMemberService } from '../../../../services/club-member.service';
import { StudentService } from '../../../../services/student.service';
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

  // Modal states
  showClubModal: boolean = false;
  isEditMode: boolean = false;
  showDeleteModal: boolean = false;
  showMembersModal: boolean = false;

  selectedClub: any = null;
  clubForm = { name: '', description: '' };

  // Members data
  clubMembers: any[] = [];
  pendingRequests: any[] = [];
  rejectedMembers: any[] = [];
  allStudents: any[] = [];
  filteredStudents: any[] = [];
  studentSearch: string = '';

  loading: boolean = false;

  constructor(
    private clubService: ClubService,
    private memberService: ClubMemberService,
    private std: StudentService,
  ) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  loadClubs() {
    this.loading = true;
    this.clubService.getAllClubs().subscribe({
      next: (res) => {
        this.clubs = res.data;
        this.filteredClubs = [...this.clubs];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  filterClubs() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClubs = this.clubs.filter(club =>
      club.name.toLowerCase().includes(term)
    );
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
    const action = this.isEditMode
      ? this.clubService.updateClub(this.selectedClub.id, this.clubForm)
      : this.clubService.createClub(this.clubForm);

    action.subscribe(() => {
      this.loadClubs();
      this.closeClubModal();
    });
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

  closeClubModal() { this.showClubModal = false; }
  closeDeleteModal() { this.showDeleteModal = false; }
  closeMembersModal() { this.showMembersModal = false; }

  openMembers(club: any) {
    this.selectedClub = club;
    this.loading = true;

    this.memberService.getMembers(club.id).subscribe({
      next: (res) => {
        const all = res.data || [];
        this.clubMembers = all.filter((m: any) => m.status === 'approved');
        this.pendingRequests = all.filter((m: any) => m.status === 'pending');
        this.rejectedMembers = all.filter((m: any) => m.status === 'rejected');
        this.loading = false;
      },
      error: () => this.loading = false
    });

    this.std.getAllStudents().subscribe(res => {
      this.allStudents = res.data || [];
      this.filteredStudents = [];
    });

    this.showMembersModal = true;
  }

  searchStudents() {
    const term = this.studentSearch.toLowerCase();
    this.filteredStudents = this.allStudents.filter(student =>
      student.user.name.toLowerCase().includes(term) &&
      !this.clubMembers.some(m => m.student_id === student.id) &&
      !this.pendingRequests.some(r => r.student_id === student.id)
    );
  }

  addMember(studentId: number) {
    const data = {
      student_id: studentId,
      club_id: this.selectedClub.id,
      status: 'approved'
    };

    this.memberService.addMember(data).subscribe(() => {
      this.openMembers(this.selectedClub);
    });
  }

  removeMember(memberId: number) {
    if (confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      this.memberService.deleteMember(memberId).subscribe(() => {
        this.openMembers(this.selectedClub);
      });
    }
  }

  approveRequest(requestId: number) {
    this.memberService.approveRequest(requestId).subscribe(() => {
      this.openMembers(this.selectedClub);
    });
  }

  rejectRequest(requestId: number) {
    this.memberService.rejectRequest(requestId).subscribe(() => {
      this.openMembers(this.selectedClub);
    });
  }
}
