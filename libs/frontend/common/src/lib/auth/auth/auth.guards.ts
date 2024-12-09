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
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { ModalConfirmYesNoComponent } from '@avans-nx-workshop/frontend/common';
import { ModalLeaveYesNoComponent } from '@avans-nx-workshop/frontend/common';
import { AuthService } from './auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Verifies that user is logged in before navigating to routes.
 *
 */
@Injectable()
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
  //
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        const token = localStorage.getItem('authToken'); // Haal token op uit local storage
        if (token) {
          return true;
        } else {
          console.log('Not logged in, redirecting to /');
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
  

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canActivateChild LoggedIn');
    return this.canActivate();
  }
}

@Injectable()
export class SaveEditedWorkGuard {
  constructor(private modalService: NgbModal) {}

  canDeactivate(): Promise<boolean> {
    return this.modalService
      .open(ModalLeaveYesNoComponent)
      .result.then((result) => true)
      .catch(() => false);
  }
}
