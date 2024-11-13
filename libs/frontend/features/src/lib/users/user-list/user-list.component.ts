import { Component } from '@angular/core';
import { IUserInfo, UserRole, UserGender } from "@avans-nx-workshop/shared/api";

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent {

    users: IUserInfo[] = [
        {
            _id: "1",
            name: "robin",
            emailAddress: "r.schellius@avans.nl",
            role: UserRole.Unknown,
            gender: UserGender.Unknown,
            password: "secret",
            isActive: true,
            profileImgUrl: "url"
        },
        {
            _id: "2",
            name: "Davide",
            emailAddress: "d.ambesi@avans.nl",
            role: UserRole.Unknown,
            gender: UserGender.Unknown,
            password: "secret",
            isActive: true,
            profileImgUrl: "url"
        }
    ]  


}
