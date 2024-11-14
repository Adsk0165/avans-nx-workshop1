import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from '../../../../libs/frontend/features/src/lib/users/user-details/user-details.component'; // Import UserDetailsComponent
import { UserListComponent } from '../../../../libs/frontend/features/src/lib/users/user-list/user-list.component'; // Import UserListComponent

const routes: Routes = [
  { path: 'users', component: UserListComponent },   // List users at '/users'
  { path: 'user/:id', component: UserDetailsComponent },  // Route to user details page using user ID
  { path: '', redirectTo: '/users', pathMatch: 'full' }  // Default route redirects to '/users'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
