import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {provideHttpClient } from '@angular/common/http'
import { UserService } from './users/user.service';
import { QuizEditComponent } from './quiz/quiz-edit/quiz-edit.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';

@NgModule({
    imports: [CommonModule, RouterModule , FormsModule],
    declarations: [
        UserDetailsComponent,
        UserDetailsComponent,
        UserListComponent,
        UserEditComponent,
        QuizEditComponent,
        QuizListComponent
    ],
    exports: [
        UserListComponent, 
        UserDetailsComponent, 
        UserEditComponent
    ],
    providers: [
        UserService,
        provideHttpClient()
    ]
})
export class FeaturesModule {}
