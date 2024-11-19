// user.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  
import { IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';  
@Injectable({
  providedIn: 'root', 
})
export class UserService {
  private users: IUserInfo[] = [
    { _id: "1", name: "Robin", emailAddress: "r.schellius@avans.nl", role: UserRole.Admin, gender: UserGender.Male, password: "secret", isActive: true, profileImgUrl: "url" },
    { _id: "2", name: "Davide", emailAddress: "d.ambesi@avans.nl", role: UserRole.Admin, gender: UserGender.Male, password: "secret", isActive: true, profileImgUrl: "url" },
  ];

  
  getUsers(): Observable<IUserInfo[]> {
    return of(this.users); 
  }

  
  getUserById(id: string): Observable<IUserInfo | undefined> {
    const user = this.users.find(u => u._id === id); 
    return of(user); 
  }

  
  addUser(user: IUserInfo): Observable<IUserInfo> {
    this.users.push(user); 
    return of(user); 
  }

  
  updateUser(updatedUser: IUserInfo ): Observable<IUserInfo> {
    const index = this.users.findIndex(u => u._id === updatedUser._id);
    if (index !== -1) {
      this.users[index] = updatedUser; 
    }
    return of(updatedUser); 
  }

  
  deleteUser(id: string): Observable<void> {
    this.users = this.users.filter(u => u._id !== id);
    return of();
  }
}
