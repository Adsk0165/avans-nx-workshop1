import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './auth/auth/register/register.component';
import { Form } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './shared/shared/alert/alert.component';
import { LoginComponent } from './auth/auth/login/login.component';

@NgModule({
  declarations: [RegisterComponent,AlertComponent, LoginComponent], // Add RegisterComponent here
  imports: [CommonModule, ReactiveFormsModule ],
  exports: [RegisterComponent, AlertComponent, LoginComponent] // Export it so other modules can use it
})
export class FrontendCommonModule {}
