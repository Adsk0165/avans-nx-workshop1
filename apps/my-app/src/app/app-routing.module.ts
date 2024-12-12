import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizAddComponent, QuizDetailsComponent, QuizEditComponent, UserDetailsComponent, UserEditComponent } from '@avans-nx-workshop/features';
import { UserListComponent } from '@avans-nx-workshop/features'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { QuizListComponent } from '@avans-nx-workshop/features';
import { UserAddComponent } from '@avans-nx-workshop/features';
import { LoggedInAuthGuard, LoginComponent, RegisterComponent, RoleAuthGuard } from '@avans-nx-workshop/frontend/common'; 
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: 'edit/:id', component: UserEditComponent, canActivate: [LoggedInAuthGuard, RoleAuthGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInAuthGuard] },   
  { path: 'user/:id', component: UserDetailsComponent , canActivate: [LoggedInAuthGuard]},
  { path: 'about', component: AboutComponent },    
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'quiz/new', component: QuizAddComponent, canActivate: [LoggedInAuthGuard]},
  { path: 'quizedit/:id', component: QuizEditComponent, canActivate: [LoggedInAuthGuard,]},
  { path: 'quizzes', component: QuizListComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'users/new', component: UserAddComponent, canActivate: [LoggedInAuthGuard, RoleAuthGuard]},
  {path: 'quiz/:id', component: QuizDetailsComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
