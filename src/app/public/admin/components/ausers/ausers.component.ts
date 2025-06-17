import { Component, OnInit } from '@angular/core'; 
import { UserService } from '../../../../services/user.service';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
 
@Component({ 
  selector: 'app-ausers', 
  templateUrl: './ausers.component.html', 
  styleUrls: ['./ausers.component.scss'],
  imports:[ReactiveFormsModule , CommonModule] 
}) 
export class AusersComponent implements OnInit { 
 
  users: any[] = []; 
  totalUsers: number = 0; 
  selectedUser: any = null; 
  showForm: boolean = false; 
  userForm!: FormGroup; 
 
  constructor(private userService: UserService, private fb: FormBuilder) {} 
 
  ngOnInit(): void { 
    this.loadUsers(); 
    this.initForm(); 
  } 
 
  initForm() { 
    this.userForm = this.fb.group({ 
      name: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      password: [''],  // نخليها فاضية بشكل دائم
      role: ['', Validators.required] 
    }); 
  } 
 
  loadUsers() { 
    this.userService.getUsers().subscribe(res => { 
      this.users = res.data; 
      this.totalUsers = res.pagination.total; 
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
      password: '' // عند التعديل دايمًا بنسيبها فاضية
    }); 
    this.showForm = true; 
  } 
 
  saveUser() {
  if (this.userForm.invalid) return;

  const formData = { ...this.userForm.value };

  if (this.selectedUser) { 
    if (!formData.password) delete formData.password;

    // هنا هنخلي الايميل يتبعت دايمًا
    this.userService.updateUser(this.selectedUser.id, formData).subscribe(() => { 
      this.loadUsers(); 
      this.showForm = false; 
    });

  } else {
    if (!formData.password) {
      alert("Password is required for new user");
      return;
    }
    this.userService.createUser(formData).subscribe(() => { 
      this.loadUsers(); 
      this.showForm = false; 
    });
  }
}

 
  deleteUser(id: number) { 
    if (confirm("Are you sure?")) { 
      this.userService.deleteUser(id).subscribe(() => { 
        this.loadUsers(); 
      }); 
    } 
  } 
}
