import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent, UserEditComponent } from '@avans-nx-workshop/features';
import { UserListComponent } from '@avans-nx-workshop/features'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: 'edit/:id', component: UserEditComponent},
  { path: 'users', component: UserListComponent },   
  { path: 'user/:id', component: UserDetailsComponent },  
  { path: '', redirectTo: '/users', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
