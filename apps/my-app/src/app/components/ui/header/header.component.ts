import { Component } from '@angular/core';
import { AuthService } from '@avans-nx-workshop/frontend/common';

@Component({
    selector: 'avans-nx-workshop-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private authService: AuthService) {}

    isLoggedIn$ = this.authService.isLoggedIn$;

    onLogout() {
        this.authService.logout();
      }

}

