import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env'; 

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = localStorage.getItem('currentuser');
    console.log('Retrieved token from localStorage:', token);

    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!cleanedToken) {
      console.log('Token is missing or invalid, redirecting to login');
      this.router.navigate(['/login']);
      return of(false);
    }

    try {

      const decodedTokenPayload = JSON.parse(atob(cleanedToken.split('.')[1]));
      const userIdFromToken = decodedTokenPayload?.user_id;

      if (!userIdFromToken) {
        console.log('User ID is missing in the token, redirecting to login');
        this.router.navigate(['/login']);
        return of(false);
      }

      console.log('Decoded Token Payload:', decodedTokenPayload);
      console.log('User ID from Token:', userIdFromToken);

      const apiUrl = `${environment.dataApiUrl}/user/${userIdFromToken}`;

      return this.http.get<any>(apiUrl).pipe(
        switchMap((response) => {
          console.log('Fetched User Response:', response);
          
          const user = response.results; 
          if (!user) {
            console.log('User data is missing in the response, redirecting to login');
            this.router.navigate(['/login']);
            return of(false);
          }

          const userRole = user.role;
          console.log('User Role:', userRole);

       
          if (userRole === 'admin') {
            console.log('User is an admin, granting access to all resources');
            return of(true);
          }

          
          const userIdParam = route.paramMap.get('id'); 
          const isOwnResource = userIdFromToken === userIdParam;
          if (isOwnResource) {
            console.log('User can modify their own resource');
            return of(true);
          }

          console.log('Access denied: User does not have permission to modify this resource');
          this.router.navigate(['/dashboard']);
          return of(false);
        }),
        catchError((error) => {
          console.error('Failed to fetch user details from backend:', error);
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    } catch (error) {
      console.error('Failed to decode token or retrieve user info:', error);
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
