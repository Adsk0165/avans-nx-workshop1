import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { ModalConfirmYesNoComponent } from './modal/modal.confirm-yes-no.component';
import { ModalLeaveYesNoComponent } from './modal/modal.leave-yes-no.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../../auth/auth/register/register.component';
import { LoggedInAuthGuard } from '../../auth/auth/auth.guards';
import { RoleAuthGuard } from '../../auth/auth/role.authguard';

@NgModule({
  declarations: [
    SpinnerComponent,
    AlertComponent,
    ModalConfirmYesNoComponent,
    ModalLeaveYesNoComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent
    
  ],
  exports: [SpinnerComponent, AlertComponent, RegisterComponent, LoggedInAuthGuard,RoleAuthGuard],
})
export class SharedModule {}
