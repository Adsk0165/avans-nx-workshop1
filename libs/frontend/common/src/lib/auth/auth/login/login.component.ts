import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subs!: Subscription;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailAddress: new FormControl(null, [Validators.required, this.validEmail.bind(this)]),
      password: new FormControl(null, [Validators.required, this.validPassword.bind(this)]),
    });

    this.subs = this.authService.getUserFromLocalStorage().subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  loginError: string | null = null;

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      const { emailAddress, password } = this.loginForm.value;
  
      this.authService.login(emailAddress, password).subscribe({
        next: (user) => {
          if (user) {
            this.loginError = null;
            this.router.navigate(['/']);
          }
          this.submitted = false;
        },
        error: (err) => {
          this.loginError = 'Inloggen mislukt. Controleer je e-mailadres en wachtwoord.';
          this.submitted = false;
        }
      });
    } else {
      this.submitted = false;
    }
  }

  validEmail(control: FormControl): { [s: string]: boolean } | null {
    const email = control.value;
    const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regexp.test(email)) {
      return { email: true };
    }
    return null;
  }

  validPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    const regexp = /^[a-zA-Z]([a-zA-Z0-9]){2,14}$/;
    if (!regexp.test(password)) {
      return { password: true };
    }
    return null;
  }
}
