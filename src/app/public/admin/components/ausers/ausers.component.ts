import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ausers',
  templateUrl: './ausers.component.html',
  styleUrls: ['./ausers.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AusersComponent implements OnInit {

  users: any[] = [];
  totalUsers: number = 0;
  selectedUser: any = null;
  showForm: boolean = false;
  userForm!: FormGroup;
  loading: boolean = false;

  currentUserId: number = 0; // المستخدم الحالي

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const userData: any = localStorage.getItem('user');
    if (userData) {
      this.currentUserId = JSON.parse(userData)?.id || 0;
    }

    this.initForm();
    this.loadUsers();
  }

  initForm() {
    this.userForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  phone: [''], // تم إضافته هنا
  password: [''],
  role: ['', Validators.required]
});

  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe(res => {
      this.users = res.data;
      this.totalUsers = res.pagination.total;
      this.loading = false;
    });
  }

  addUser() {
    this.selectedUser = null;
    this.userForm.reset();
    this.showForm = true;
  }

  editUser(user: any) {
    this.selectedUser = user;
    this.userForm.patchValue({
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone || '',
  password: ''
});

    this.showForm = true;
  }

saveUser() {
  if (this.userForm.invalid) return;

  const formData = { ...this.userForm.value };
  const request$ = this.selectedUser
    ? this.userService.updateUser(this.selectedUser.id, formData)
    : this.userService.createUser(formData);

  request$.subscribe({
    next: () => {
      this.loadUsers();
      this.showForm = false;
    },
    error: (err) => {
      if (err.status === 422) {
        const validationErrors = err.error.errors;
        for (const key in validationErrors) {
          if (this.userForm.get(key)) {
            this.userForm.get(key)?.setErrors({ serverError: validationErrors[key][0] });
          }
        }
      }
    }
  });
}


  deleteUser(id: number) {
    if (id === this.currentUserId) {
      alert("لا يمكنك حذف حسابك الحالي.");
      return;
    }

    if (confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
