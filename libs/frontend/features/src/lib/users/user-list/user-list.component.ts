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
      this.userService.getUsers().subscribe((users) => {
        this.users = users;  // Assign the fetched users to the component's 'users' property
      });
    }
}
