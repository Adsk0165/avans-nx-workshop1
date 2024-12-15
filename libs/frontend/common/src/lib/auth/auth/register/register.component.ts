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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
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
      // Ensure you check what is actually in the form
      const formData = this.registerForm.value;
      console.log('Form Data:', formData);  // Check what data you are sending
      
      const userData: ICreateUser = {
        name: formData.firstname + ' ' + formData.lastname,  // Combine first and last name
        emailAddress: formData.email,  // Ensure email is being passed correctly
        password: formData.password,
      };
  
      this.authService.register(userData).subscribe((user) => {
        if (user) {
          console.log('User created successfully:', user);
          this.router.navigate(['/']);
        }
      });
    } else {
      console.error('Form is invalid');
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
  validPassword(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    const regexp = /^[a-zA-Z]([a-zA-Z0-9]){2,14}$/;
    if (!regexp.test(password)) {
      return { password: true }; // Invalid password
    }
    return null; // Valid password
  }
}
