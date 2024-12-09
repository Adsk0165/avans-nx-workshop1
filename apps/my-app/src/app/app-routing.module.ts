import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizAddComponent, QuizDetailsComponent, QuizEditComponent, UserDetailsComponent, UserEditComponent } from '@avans-nx-workshop/features';
import { UserListComponent } from '@avans-nx-workshop/features'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { QuizListComponent } from '@avans-nx-workshop/features';
import { UserAddComponent } from '@avans-nx-workshop/features';
import { LoginComponent, RegisterComponent } from '@avans-nx-workshop/frontend/common';
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: 'edit/:id', component: UserEditComponent},
  { path: 'users', component: UserListComponent },   
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'about', component: AboutComponent },    
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'quiz/new', component: QuizAddComponent},
  { path: 'quizedit/:id', component: QuizEditComponent},
  { path: 'quizzes', component: QuizListComponent},
  {path: 'users/new', component: UserAddComponent},
  {path: 'quiz/:id', component: QuizDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
