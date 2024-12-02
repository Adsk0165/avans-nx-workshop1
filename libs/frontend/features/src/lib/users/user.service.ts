// user.service.ts

import { EnvironmentInjector, Injectable } from '@angular/core';
import { catchError, map, Observable, of, take, tap } from 'rxjs';  
import { ApiResponse, IUserInfo, UserGender, UserRole } from '@avans-nx-workshop/shared/api';  
import { HttpClient } from '@angular/common/http';
import {environment} from '@avans-nx-workshop/shared/util-env'
@Injectable({
  providedIn: 'root', 
})
export class UserService {
  private users?: IUserInfo[];

  constructor(private http: HttpClient){
    console.log('user service created')
  }

  getUserAsync(): Observable<IUserInfo[]>{
     return this.http.get<ApiResponse<any>>(environment.dataApiUrl + '/user').pipe(
      tap((response) => console.log(response)),
      map((response) => response.results),
      tap((response) => console.log(response))
     );
  }

  // getUsers(): Observable<IUserInfo[]> {
  //   return of(this.users); 
  // }

  
  getUserById(id: string): Observable<IUserInfo | undefined> {
    const user = this.users!.find(u => u._id === id); 
    return of(user); 
  }

  getUserByIdAsync(id: string): Observable<IUserInfo | undefined> {
    return this.http.get<ApiResponse<any>>(`${environment.dataApiUrl}/user/${id}`).pipe(
      tap((response) => console.log('Raw response from API:', response)),
      map((response) => response.results|| undefined), 
      tap((user) => {
        if (!user) {
          console.error('No user found for the given ID:', id);
        }
      })
    );
  }
  
  
  
//   addUser(user: IUserInfo): Observable<IUserInfo> {
//     this.users.push(user); 
//     return of(user); 
//   }

deleteUser(userId: string): Observable<void> {
return this.http.delete<void>(`${environment.dataApiUrl}/user/${userId}`);
}
  
  updateUserNoAsync(updatedUser: IUserInfo ): Observable<IUserInfo> {
    const index = this.users!.findIndex(u => u._id === updatedUser._id);
    if (index !== -1) {
      this.users![index] = updatedUser; 
    }
    return of(updatedUser); 
  }
  

  createUser(user: Partial<IUserInfo>): Observable<IUserInfo> {
    return this.http.post<IUserInfo>(environment.dataApiUrl + '/user',user)
  }

  updateUser(user: Partial<IUserInfo>): Observable<IUserInfo> {
    const userId = user._id; // Use the user's ID to construct the endpoint
    return this.http.put<IUserInfo>(`${environment.dataApiUrl}/user/${userId}`, user);
  }

  
//   deleteUser(id: string): Observable<void> {
//     this.users = this.users.filter(u => u._id !== id);
//     return of();
//   }
 }
