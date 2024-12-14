import { Component } from '@angular/core';
import { UserService } from 'libs/frontend/features/src/lib/users/user.service';

@Component({
    selector: 'avans-nx-workshop-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    userCount = 0;
    constructor(private userService: UserService) {}

    ngOnInit(): void {
      
        this.userService.getUserAsync().subscribe((users: any[]) => {
          this.userCount = users.length;
        });
      }
}
