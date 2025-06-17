import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development'; 

@Component({
  selector: 'app-plink-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './plink-student.component.html',
  styleUrl: './plink-student.component.scss'
})
export class PlinkStudentComponent {
  linkForm: FormGroup;
  loading = false;
  message = '';
  success = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.linkForm = this.fb.group({
      studentEmail: ['', [Validators.required, Validators.email]]
    });
  }

  linkStudent() {
    if (this.linkForm.invalid) return;

    this.loading = true;
    this.message = '';
    this.success = false;

    const parentId = JSON.parse(localStorage.getItem('user') || '{}')?.id;
    const email = this.linkForm.value.studentEmail;

    this.http.post(`${environment.url}/students/assign-to-parent`, {
      email,
      parent_id: parentId
    }).subscribe({
      next: (res: any) => {
        this.success = true;
        this.message = res.message || '   success';
        this.linkForm.reset();
        location.reload();
      },
      error: (err) => {
        this.success = false;
        this.message = err.error?.message || 'Error   ';
      },
      complete: () => this.loading = false
    });
  }
}
