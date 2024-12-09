import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ICreateUser, IUserInfo } from '@avans-nx-workshop/shared/api';
import { Router } from '@angular/router';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../../shared/shared/alert/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUserInfo | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    this.getUserFromLocalStorage().subscribe((user) => {
      if (user) {
        this.currentUser$.next(user);
      }
    });
  }

  login(emailAddress: string, password: string): Observable<IUserInfo | undefined> {
    return this.http
      .post<any>(`${environment.dataApiUrl}/auth/login`, { emailAddress, password }, { headers: this.headers })
      .pipe(
        map((response) => {
          // Log the entire JSON response body
          console.log('Login Response Body:', response);
  
          // Ensure the response contains 'results' field
          if (!response.results || !response.results.token) {
            throw new Error('No token found in login response');
          }
  
          const user = response.results as IUserInfo; // Cast the response to IUserInfo
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error) => {
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }
  
  

  register(userData: ICreateUser): Observable<IUserInfo | undefined> {
    return this.http
      .post<IUserInfo>(`${environment.dataApiUrl}/auth/register`, userData, { headers: this.headers })
      .pipe(
        map((response: IUserInfo) => {
          if (!response.token) {
            throw new Error('No token found in registration response');
          }
          localStorage.setItem(this.CURRENT_USER, JSON.stringify(userData))
          this.currentUser$.next(response);
          this.alertService.success('You have been registered');
          return response;
        }),
        catchError((error) => {
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  private saveUserToLocalStorage(user: IUserInfo ): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user.token));
  }

  getUserFromLocalStorage(): Observable<IUserInfo | undefined> {
    const localUser = localStorage.getItem(this.CURRENT_USER);
    if (localUser) {
      return of(JSON.parse(localUser) as IUserInfo);
    }
    return of(undefined);
  }

  logout(): void {
    this.router.navigate(['/']).then(() => {
      localStorage.removeItem(this.CURRENT_USER);
      this.currentUser$.next(undefined);
      this.alertService.success('You have been logged out.');
    });
  }
}
