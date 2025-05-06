import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { AppComponent } from '../../app.component';

import {trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-5px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-5px)' }))
      ])
    ])
  ]
})
export class LoginComponent {


  loginForm: FormGroup;
  hidePassword = true;
  isSubmitting = false;
  loginError: string | null = null;

  constructor(private fb: FormBuilder,private authService: AuthService,private appComponent: AppComponent) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        setTimeout(() => {
          // Save user to localStorage
          localStorage.setItem('user', JSON.stringify(res));
          this.appComponent.setLoginState(true);
          this.isSubmitting = false;
        }, 1500); // Keep your animation delay
      },
      error: (err) => {
        setTimeout(() => {
          this.loginError = 'Invalid email or password';
          this.isSubmitting = false;
        }, 1500);
      },
    });
  }


  // loginForm: FormGroup;
  // hidePassword = true;
  // isSubmitting = false;

  // constructor(private fb: FormBuilder) {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //   });
  // }

  // togglePassword(): void {
  //   this.hidePassword = !this.hidePassword;
  // }

  // onSubmit(): void {
  //   if (this.loginForm.invalid) return;

  //   this.isSubmitting = true;

  //   // Simulate API delay
  //   setTimeout(() => {
  //     console.log('Login data:', this.loginForm.value);
  //     this.isSubmitting = false;
  //   }, 1500);
  // }
}
