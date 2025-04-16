import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';
import { ICreateUser } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
 
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subs!: Subscription; 
  registerError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s\-]+$/)
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s\-]+$/)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        this.validPassword
      ]),
    });
  }

 
  
  

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
  
      const userData: ICreateUser = {
        name: formData.firstname + ' ' + formData.lastname,
        emailAddress: formData.email,
        password: formData.password,
      };
  
      this.authService.register(userData).subscribe({
        next: (user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Registratiefout:', err);
          this.registerError = 'Registratie mislukt. Controleer of het e-mailadres al bestaat.';
        }
      });
    }
  }
  
  
  
  // Custom email validation
  validEmail(control: FormControl): { [s: string]: boolean } | null {
    const email = control.value;
    const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regexp.test(email)) {
      return { email: true }; // Invalid email
    }
    return null; // Valid email
  }

  // Custom password validation
  validPassword(control: FormControl): { [key: string]: boolean } | null {
    const password = control.value;
    const regex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/; // min 1 hoofdletter, 1 speciaal teken, 8 karakters
  
    if (password && !regex.test(password)) {
      return { invalidPassword: true }; // ← dit moet je gebruiken
    }
    return null;
  }
  
}
