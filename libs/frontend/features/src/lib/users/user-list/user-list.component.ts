import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from "@avans-nx-workshop/shared/api";
import { UserService } from '../user.service';

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
    users: IUserInfo[] = [];
  
    constructor(private userService: UserService) {}  // Inject the UserService
  
    ngOnInit(): void {
      this.userService.getUserAsync().subscribe((users) => {
        this.users = users;  // Assign the fetched users to the component's 'users' property
      });
    }

    deleteUser(userId: string, index: number): void {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            // Remove the user from the list
            this.users.splice(index, 1);
            alert('User deleted successfully!');
          },
          error: (err: any) => {
            console.error('Error deleting user:', err);
            alert('Failed to delete user.');
          },
        });
      }
    }
  
}
