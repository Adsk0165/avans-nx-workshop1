import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from "@avans-nx-workshop/shared/api";
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  styles: []
})
export class UserEditComponent implements OnInit {
  users: IUserInfo[] = [];
  user: IUserInfo = {
    _id: '',
    name: '',
    emailAddress: '',
    role: UserRole.Guest, 
    isActive: false,
    profileImgUrl: '',
    gender: UserGender.Male,  
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
    this.userService.getUserByIdAsync(id).subscribe(userData => {
      if (userData) {
        this.user = userData; 
      } else {
        console.error("User niet gevonden!");
        
      }
    });
  }

  saveChanges(): void {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        alert('User succesvol geupdate!');
        this.router.navigate(['/users']);  
      },
      error: (err) => {
        console.error("Error update user:", err);
        alert('User kon niet geupdate worden.');
      },
    });
  }
}
