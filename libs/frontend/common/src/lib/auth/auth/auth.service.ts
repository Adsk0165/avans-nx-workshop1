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
  public isLoggedIn$ = this.currentUser$.asObservable();
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

          console.log('Login Response Body:', response);
         
          if (!response.results || !response.results.token) {
            throw new Error('No token found in login response');
          }
  
          const user = response.results as IUserInfo; 
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
          this.alertService.success('You have been registered');
  
          this.login(userData.emailAddress, userData.password).subscribe({
            next: (loginResponse) => {
              if (loginResponse?.token) {
                this.saveUserToLocalStorage(loginResponse);
                this.currentUser$.next(loginResponse);
                this.alertService.success('You are now logged in.');
              }
            },
            error: (error) => {
              console.error('Login after registration failed:', error);
              this.alertService.error('Failed to log in after registration.');
            },
          });
  
          return response; 
        }),
        catchError((error) => {
          console.error('Register Error:', error);
          const errorMessage =
            (error?.error?.message || error?.message || 'An unknown error occurred');
          this.alertService.error(errorMessage);
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

  getUserDetails(userId: string): Observable<IUserInfo> {
    return this.http.get<IUserInfo>(`${environment.dataApiUrl}/user/${userId}`);
  }


  logout(): void {
    this.router.navigate(['/']).then(() => {
      localStorage.removeItem(this.CURRENT_USER);
      this.currentUser$.next(undefined);
      this.alertService.success('You have been logged out.');
    });
  }
}
