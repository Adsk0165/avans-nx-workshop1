import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Adjust the path to your service
import { IUserInfo, UserRole, UserGender } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-user-add',
  templateUrl: './user-add.component.html',
})
export class UserAddComponent {
  user: Partial<IUserInfo> = {
    name: '',
    emailAddress: '',
    role: UserRole.Guest,
    gender: UserGender.None,
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.user) {
      this.userService.createUser(this.user).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          alert('User created successfully!');
        },
        error: (error) => {
          console.error('Error creating user:', error);
          alert('Error creating user!');
        },
      });
    }
  }
}
