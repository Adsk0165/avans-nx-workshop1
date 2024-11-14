import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api'; // Import IUserInfo

@Component({
  selector: 'avans-nx-workshop-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  user: IUserInfo | undefined;  // Define a property to hold the user data
  users: IUserInfo[] = [
    {
      _id: "1",
      name: "robin",
      emailAddress: "r.schellius@avans.nl",
      role: UserRole.Admin, // Adjust according to your `UserRole` definition
      gender: UserGender.Male, // Adjust according to your `UserGender` definition
      password: "secret",
      isActive: true,
      profileImgUrl: "url"
    },
    {
      _id: "2",
      name: "Davide",
      emailAddress: "d.ambesi@avans.nl",
      role: UserRole.Admin, // Adjust according to your `UserRole` definition
      gender: UserGender.Male,
      password: "secret",
      isActive: true,
      profileImgUrl: "url"
    }
  ];  // Example list of users

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');  // Capture the user ID from the route

    if (userId) {
        // Find the user by ID
    }
  }
}
