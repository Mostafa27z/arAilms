
import { environment } from '../../../../environments/environment.development';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  
    const { name, email, password ,password_confirmation } = this.registerForm.value;
    const payload = {
      name,
      email,
      password,
      password_confirmation,
    };
  
    this.http.post(`${this.apiUrl}/register`, payload).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error', err);
        // no reload here
      }
    });
  }
  
}
