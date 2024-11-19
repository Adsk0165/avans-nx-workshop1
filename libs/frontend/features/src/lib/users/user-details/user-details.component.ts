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
    private route: ActivatedRoute, 
    private userService: UserService 
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');  
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;  
      });
    }
  }
}
