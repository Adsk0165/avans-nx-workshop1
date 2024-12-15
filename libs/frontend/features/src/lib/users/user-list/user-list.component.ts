import { Component, OnInit } from '@angular/core';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { AuthService } from '../../../../../common/src/lib/auth/auth/auth.service';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'avans-nx-workshop-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: IUserInfo[] = [];
  currentUserId: string = ''; 
  currentUserRole: string = ''; 

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userService.getUserAsync().subscribe((users) => {
      this.users = users;
    });

    const token = localStorage.getItem('currentuser');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = decodedToken?.user_id || ''; 
    }

    if (this.currentUserId) {
      const apiUrl = `${environment.dataApiUrl}/user/${this.currentUserId}`;
      this.http.get<any>(apiUrl).subscribe(
        (response) => {
          this.currentUserRole = response?.results?.role || ''; 
        },
        (error) => {
          console.error('Failed to fetch user role:', error);
        }
      );
    }
  }

  deleteUser(userId: string, index: number): void {
    if (!this.currentUserId) {
      alert('You are not logged in!');
      return;
    }

    if (userId === this.currentUserId) {
      if (confirm('Are you sure you want to delete your own account?')) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.users.splice(index, 1);  
            alert('Your account has been deleted successfully!');
            this.authService.logout()
          },
          error: (err) => {
            console.error('Error deleting account:', err);
            alert('Failed to delete your account.');
          },
        });
      }
      return;
    }

    if (this.currentUserRole !== 'admin') {
      alert('You do not have permission to delete other users.');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users.splice(index, 1);
          alert('User deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user.');
        },
      });
    }
  }
}
