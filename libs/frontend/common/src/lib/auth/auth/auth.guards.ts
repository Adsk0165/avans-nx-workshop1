import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        const token = localStorage.getItem('currentuser');
        console.log('Retrieved token from localStorage:', token);
  
        // Validate token presence and length
        if (token && token.length > 10) { // Arbitrary length check to ensure token isn't empty or invalid
          console.log('Token exists and seems valid.');
          return true;
        } else {
          console.log('Token is missing or invalid, redirecting to /');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
  

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
