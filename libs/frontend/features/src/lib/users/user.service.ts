// user.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  // Observable to handle asynchronous tasks
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';  // Assuming this is the interface for user data

@Injectable({
  providedIn: 'root',  // This registers the service in the root injector so it's available throughout the app
})
export class UserService {
  private users: IUserInfo[] = [
    { _id: "1", name: "Robin", emailAddress: "r.schellius@avans.nl", role: UserRole.Admin, gender: UserGender.Male, password: "secret", isActive: true, profileImgUrl: "url" },
    { _id: "2", name: "Davide", emailAddress: "d.ambesi@avans.nl", role: UserRole.Admin, gender: UserGender.Male, password: "secret", isActive: true, profileImgUrl: "url" },
  ];

  // Get all users
  getUsers(): Observable<IUserInfo[]> {
    return of(this.users); // Returning the list of users wrapped in an Observable
  }

  // Get user by ID
  getUserById(id: string): Observable<IUserInfo | undefined> {
    const user = this.users.find(u => u._id === id); // Find the user by ID
    return of(user); // Return an Observable with the user (or undefined if not found)
  }

  // Add a new user
  addUser(user: IUserInfo): Observable<IUserInfo> {
    this.users.push(user); // Push the new user into the array
    return of(user); // Return the added user
  }

  // Update an existing user
  updateUser(updatedUser: IUserInfo ): Observable<IUserInfo> {
    const index = this.users.findIndex(u => u._id === updatedUser._id);
    if (index !== -1) {
      this.users[index] = updatedUser; // Update the user at the found index
    }
    return of(updatedUser); // Return the updated user
  }

  // Delete a user
  deleteUser(id: string): Observable<void> {
    this.users = this.users.filter(u => u._id !== id); // Remove the user from the array
    return of(); // Return an empty Observable to indicate completion
  }
}
