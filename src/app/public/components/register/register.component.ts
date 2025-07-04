import { environment } from '../../../../environments/environment.development';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule, CommonModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  apiUrl = environment.url;
  loading = true;
ngAfterViewInit() {
  const img = new Image();
  img.src = '/assets/register.png';
  img.onload = () => {
    this.loading = false;
  };
}
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['student', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });

    // // Simulate loading delay
    // setTimeout(() => {
    //   this.loading = false;
    // }, 500); // adjust if needed
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, phone, role, password, password_confirmation } = this.registerForm.value;
    const payload = {
      name,
      email,
      phone,
      role,
      password,
      password_confirmation,
    };

    this.http.post(`${this.apiUrl}/register`, payload).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        // redirect based on role
        if (role === 'parent') {
          this.router.navigate(['/parents']);
        } else {
          this.router.navigate(['/student']);
        }
      },
      error: (err) => {
        console.error('Registration error', err);
      }
    });
  }
}
