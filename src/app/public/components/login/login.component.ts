import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      terms: [false]
    });
  }

  submit() {
  if (this.form.invalid) {
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  const data = {
    email: this.form.value.email,
    password: this.form.value.password
  };

  this.http.post(`${environment.url}/login`, data).subscribe({
    next: (response: any) => {
      console.log('Login Success:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('roleid', JSON.stringify(response.related_id));

      const role = response.user.role;

      switch (role) {
  case 'student':
    this.router.navigate(['/student']).then(() => window.location.reload());
    break;
  case 'admin':
    this.router.navigate(['/admin']).then(() => window.location.reload());
    break;
  case 'teacher':
    this.router.navigate(['/teacher']).then(() => window.location.reload());
    break;
  case 'parent':
    this.router.navigate(['/parents']).then(() => window.location.reload());
    break;
  default:
    this.router.navigate(['/']).then(() => window.location.reload());
}

    },
    error: (error) => {
      console.error('Login Failed:', error);
      this.errorMessage = error.error?.message || 'Something went wrong. Please try again.';
      this.loading = false;
    }
  });
}

}
