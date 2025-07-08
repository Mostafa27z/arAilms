import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../../services/group.service';
import { GroupMemberService } from '../../../../services/group-member.service';
import { GroupSessionService } from '../../../../services/group-session.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  imports:[CommonModule , ReactiveFormsModule]
})
export class TeacherGroupsComponent implements OnInit {
  teacherId: number = 0;
  groups: any[] = [];
  loading: boolean = false;

  showGroupModal: boolean = false;
  isEditMode: boolean = false;
  groupForm!: FormGroup;
  selectedGroup: any = null;

  sessions: any[] = [];
  pendingRequests: any[] = [];

  constructor(
    private groupService: GroupService,
    private memberService: GroupMemberService,
    private sessionService: GroupSessionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.teacherId = +JSON.parse(localStorage.getItem('roleid') || '0');
    this.loadGroups();
    this.groupForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    });
  }

  loadGroups() {
    this.loading = true;
    this.groupService.getAll().subscribe({
      next: (res) => {
        this.groups = res.data.filter((g: any) => g.teacher_id === this.teacherId);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openModal(group: any = null) {
    this.showGroupModal = true;
    this.isEditMode = !!group;
    this.selectedGroup = group;

    if (group) {
      this.groupForm.patchValue(group);
    } else {
      this.groupForm.reset();
    }
  }

  saveGroup() {
    const data = { ...this.groupForm.value, teacher_id: this.teacherId };
    if (this.isEditMode && this.selectedGroup) {
      this.groupService.update(this.selectedGroup.id, data).subscribe(() => {
        this.loadGroups();
        this.showGroupModal = false;
      });
    } else {
      this.groupService.create(data).subscribe(() => {
        this.loadGroups();
        this.showGroupModal = false;
      });
    }
  }

  deleteGroup(id: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذه المجموعة؟')) {
      this.groupService.delete(id).subscribe(() => this.loadGroups());
    }
  }

  // جلسات
  viewSessions(groupId: number) {
    this.sessionService.getByGroup(groupId).subscribe((res:any) => {
      this.sessions = res.data || [];
    });
  }

  // الطلبات
  viewPending(groupId: number) {
    this.memberService.getPending(groupId).subscribe((res:any) => {
      this.pendingRequests = res.data || [];
    });
  }

  approveRequest(id: number) {
    this.memberService.approve(id).subscribe((res:any) =>{this.viewPending(this.selectedGroup.id) ; console.log(res)} );
  }
// أضف داخل component:

showSessionModal: boolean = false;
sessionForm!: FormGroup;

openSessionModal(group: any) {
  this.selectedGroup = group;
  this.sessionForm = this.fb.group({
    group_id: [group.id],
    title: ['', Validators.required],
    description: [''],
    session_time: ['', Validators.required],
    link: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
  });
  this.showSessionModal = true;
}

closeSessionModal() {
  this.showSessionModal = false;
  this.sessionForm.reset();
}

saveSession() {
  if (this.sessionForm.invalid) return;

  const data = this.sessionForm.value;
  this.sessionService.createSession(data).subscribe({
    next: () => {
      this.viewSessions(this.selectedGroup.id);
      this.closeSessionModal();
    },
    error: (err) => console.error(err),
  });
}
deleteSession(sessionId: number) {
  if (confirm('هل أنت متأكد أنك تريد حذف هذه الجلسة؟')) {
    this.loading = true;
    this.sessionService.deleteSession(sessionId).subscribe({
      next: () => {
        this.viewSessions(this.selectedGroup.id); // إعادة تحميل الجلسات
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}

  rejectRequest(id: number) {
    this.memberService.reject(id).subscribe(() => this.viewPending(this.selectedGroup.id));
  }

  closeModal() {
    this.showGroupModal = false;
    this.selectedGroup = null;
    this.sessions = [];
    this.pendingRequests = [];
  }
}
