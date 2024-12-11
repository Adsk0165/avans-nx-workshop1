import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from "@avans-nx-workshop/shared/api";
import { UserService } from '../user.service';
import { AuthService} from '../../../../../common/src/lib/auth/auth/auth.service'
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient} from '@angular/common/http'
@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
    users: IUserInfo[] = [];
  
    constructor(private userService: UserService, private authService: AuthService, private http: HttpClient) {}  // Inject the UserService
  
    ngOnInit(): void {
      this.userService.getUserAsync().subscribe((users) => {
        this.users = users;  // Assign the fetched users to the component's 'users' property
      });
    }

    deleteUser(userId: string, index: number): void {
      // Step 1: Retrieve the token from localStorage
      const token = localStorage.getItem('currentuser');
      console.log('Retrieved token from localStorage:', token);
    
      if (!token) {
        alert('You are not logged in!');
        return;
      }
    
      // Step 2: Clean the token (remove surrounding quotes)
      const cleanedToken = token.replace(/^"(.+)"$/, '$1');
    
      try {
        // Step 3: Decode the token payload (assuming it's JWT)
        const decodedTokenPayload = JSON.parse(atob(cleanedToken.split('.')[1]));
        const userIdFromToken = decodedTokenPayload?.user_id; // Extract user_id from the decoded token
    
        if (!userIdFromToken) {
          alert('User ID is missing from token.');
          return;
        }
    
        // Step 4: Fetch user details using the user_id
        const apiUrl = `${environment.dataApiUrl}/user/${userIdFromToken}`;
        this.http.get<any>(apiUrl).subscribe({
          next: (response) => {
            console.log('Fetched User Response:', response);
    
            const user = response.results;  // Assuming the response has a 'results' field
            if (!user) {
              alert('User details not found.');
              return;
            }
    
            // Step 5: Check if the user is an admin
            if (user.role !== 'admin') {
              alert('You do not have permission to delete users.');
              return;
            }
    
            // Step 6: Confirm deletion and proceed
            if (confirm('Are you sure you want to delete this user?')) {
              this.userService.deleteUser(userId).subscribe({
                next: () => {
                  // Remove the user from the list after successful deletion
                  this.users.splice(index, 1);
                  alert('User deleted successfully!');
                },
                error: (err: any) => {
                  console.error('Error deleting user:', err);
                  alert('Failed to delete user.');
                },
              });
            }
          },
          error: (err: any) => {
            console.error('Failed to fetch user details from backend:', err);
            alert('Failed to fetch user details.');
          }
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        alert('Invalid token.');
      }
    }
    
  
}
