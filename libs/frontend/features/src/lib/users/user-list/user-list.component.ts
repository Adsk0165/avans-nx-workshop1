import { Component, OnInit } from '@angular/core';
import { IUserInfo } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { AuthService } from '../../../../../common/src/lib/auth/auth/auth.service';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'avans-nx-workshop-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: IUserInfo[] = [];
  currentUserId: string = ''; 
  currentUserRole: string = ''; 

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userService.getUserAsync().subscribe((users) => {
      this.users = users;
    });

    const token = localStorage.getItem('currentuser');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      this.currentUserId = decodedToken?.user_id || ''; 
    }

    if (this.currentUserId) {
      const apiUrl = `${environment.dataApiUrl}/user/${this.currentUserId}`;
      this.http.get<any>(apiUrl).subscribe(
        (response) => {
          this.currentUserRole = response?.results?.role || ''; 
        },
        (error) => {
          console.error('user rol kon niet gekoppeld worden:', error);
        }
      );
    }
  }

  deleteUser(userId: string, index: number): void {
    if (!this.currentUserId) {
      alert('je bent niet ingelogd!');
      return;
    }

    if (userId === this.currentUserId) {
      if (confirm('Weet je zeker dat je je eigen account wilt verwijderen?')) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.users.splice(index, 1);  
            alert('Je account is succesbol verwijderd u wordt direct uitgelogd!');
            this.authService.logout()
          },
          error: (err) => {
            console.error('Error deleting account:', err);
            alert('Het verwijderen van je account is niet gelukt.');
          },
        });
      }
      return;
    }

    if (this.currentUserRole !== 'admin') {
      alert('Je hebt niet het recht om deze user te verwijderen.');
      return;
    }

    if (confirm('Weet je zeker dat je deze user wilt verwijderen?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users.splice(index, 1);
          alert('User succesvol verwijderd!');
        },
        error: (err) => {
          console.error('Error met het verwijderen van de uder:', err);
          alert('User kon niet gedelete worden.');
        },
      });
    }
  }
}
