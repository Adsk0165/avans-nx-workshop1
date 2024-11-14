import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';  // Assuming you have a service for fetching users
import { IUserInfo } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  user: IUserInfo | undefined;

  constructor(
    private route: ActivatedRoute,  // To read route parameters
    private userService: UserService  // To fetch user data
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');  // Get the 'id' from the URL
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;  // Fetch and assign the user data
      });
    }
  }
}
