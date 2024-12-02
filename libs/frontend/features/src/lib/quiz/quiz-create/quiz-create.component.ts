import { Component } from '@angular/core';
import { QuizService } from '../quiz.service'; // Adjust the path to your service
import { IUserInfo, UserRole, UserGender, IQuizInfo, QuizDifficulty } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-quiz-add',
  templateUrl: './quiz-create.component.html',
})
export class QuizAddComponent {
  quiz: Partial<IQuizInfo> = {
    title: '',
    description: '',
    difficulty: QuizDifficulty.Easy
  };

  constructor(private userService: QuizService) {}

  onSubmit() {
    if (this.quiz) {
      this.userService.createQuiz(this.quiz).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          alert('User created successfully!');
        },
        error: (error) => {
          console.error('Error creating user:', error);
          alert('Error creating user!');
        },
      });
    }
  }
}
