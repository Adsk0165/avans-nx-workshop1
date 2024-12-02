import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender, IQuizIdentity, IQuiz } from "@avans-nx-workshop/shared/api";
import { QuizService } from '../quiz.service';
import { IQuizInfo } from '@avans-nx-workshop/shared/api';

@Component({
    selector: 'avans-nx-workshop-quiz-list',
    templateUrl: './quiz-list.component.html',
})
export class QuizListComponent implements OnInit {
    quizzes: IQuizInfo[] = [];
  
    constructor(private quizService: QuizService) {}  // Inject the UserService
  
    ngOnInit(): void {
      this.quizService.getAllQuizzes().subscribe((quizzes) => {
        console.log('API Response:', quizzes);
        this.quizzes = quizzes;  // Assign the fetched users to the component's 'users' property
      });
    }

    deleteQuiz(id: string): void {
      if (confirm('Are you sure you want to delete this quiz?')) {
          this.quizService.deleteQuiz(id).subscribe({
              next: () => {
                  alert('Quiz deleted successfully.');
                   // Reload the quiz list after deletion
              },
              error: (err) => {
                  console.error('Error deleting quiz:', err);
                  alert('Failed to delete quiz.');
              },
          });
      }
  }
}
