import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests
import { UserService } from './users/user.service';
import { QuizEditComponent } from './quiz/quiz-edit/quiz-edit.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { QuizAddComponent } from './quiz/quiz-create/quiz-create.component';
import { QuizDetailsComponent } from './quiz/quiz-details/quiz-details.component';
import { FavoritesComponent } from './quiz/quiz-favorites/quiz-favorites.component';
import { QuizRunnerComponent } from './quiz/quiz-runner/quiz-runner.component';
import { CommentService } from './comments/comments.service';
import { QuestionsComponent } from './questions/questions.list/questions.component';
import { QuestionCreateComponent } from './questions/question.create/question.create.component';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    HttpClientModule 
  ],
  declarations: [
    UserDetailsComponent,
    UserListComponent, 
    UserEditComponent, 
    QuizEditComponent, 
    QuizListComponent, 
    UserAddComponent, 
    QuizDetailsComponent, 
    QuizAddComponent,
    FavoritesComponent,
    QuizRunnerComponent,
    QuestionsComponent,
    QuestionCreateComponent,
    QuestionEditComponent
    
  ],
  exports: [
    UserListComponent, 
    UserDetailsComponent, 
    UserEditComponent, 
    UserAddComponent,
    FavoritesComponent,
    QuizRunnerComponent,
    QuestionsComponent,
    QuestionCreateComponent,
    QuestionEditComponent
    
  ],
  providers: [
    UserService,
    CommentService
  ]
})
export class FeaturesModule {}
