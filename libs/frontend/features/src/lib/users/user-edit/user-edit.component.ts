import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from "@avans-nx-workshop/shared/api";
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {
  users: IUserInfo[] = [];
  user: IUserInfo = {
    _id: '',
    name: '',
    emailAddress: '',
    role: UserRole.Guest,  // default role
    isActive: false,
    profileImgUrl: '',
    gender: UserGender.Male,  // default gender
    password: ''
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUserData(userId);
    }
  }

  private loadUserData(id: string): void {
    this.userService.getUserById(id).subscribe(userData => {
      if (userData) {
        this.user = userData;  // Only assign if userData is defined
      } else {
        console.error("User not found!");
        // Optionally redirect or handle the "user not found" case
      }
    });
  }

  saveChanges(): void {
    this.userService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);  // Redirect after save
    });
  }
}
