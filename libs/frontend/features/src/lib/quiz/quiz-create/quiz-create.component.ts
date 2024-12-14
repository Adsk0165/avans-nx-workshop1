import { Component } from '@angular/core';
import { QuizService } from '../quiz.service'; // Adjust the path to your service
import { IUserInfo, UserRole, UserGender, IQuizInfo, QuizDifficulty } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-quiz-add',
  templateUrl: './quiz-create.component.html',
})
export class QuizAddComponent {
  categories = [
    { label: 'Algemene Kennis', value: 9 },
    { label: 'Boeken', value: 10 },
    { label: 'Films', value: 11 },
    { label: 'Muziek', value: 12 },
    { label: 'Wetenschap en Natuur', value: 17 }, 
    { label: 'Musicals en Theaters', value: 13 }, 
    { label: 'Televisie', value: 14 }, 
    { label: 'Video Games', value: 15 }, 
    { label: 'Bord Spellen', value: 16 }, 
    { label: 'Computer en wetenschap', value: 18 }, 
    { label: 'Wetenschap en Wiskunde', value: 19 }, 
    { label: 'Sport', value: 20 }, 
    { label: 'Sport', value: 21 }, 
    { label: 'Geographie', value: 22 }, 
    { label: 'Geschiedenis', value: 23 }, 
    { label: 'Politiek', value: 24 }, 
    { label: 'Kunst', value: 25 }, 
    { label: 'Beroemdheden', value: 26 }, 
    { label: 'dieren', value: 27 }
  ];


  quizzes: IQuizInfo[] = [];
    quiz: IQuizInfo = {
      title: '',
      description: '',
      difficulty: QuizDifficulty.Easy, // default role
      isActive: false,
      _id: '',
      createdAt: undefined,
      updatedAt: undefined,
      category: 9
    };

constructor(
    private quizservice: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {
    if (this.quiz) {
      // Ensure that the category is a number before submission
      this.quiz.category = +this.quiz.category; // Converts category to a number
      this.quizservice.createQuiz(this.quiz).subscribe({
        next: (response) => {
          console.log('Quiz created successfully:', response);
          alert('Quiz created successfully!');
        },
        error: (error) => {
          console.error('Error creating quiz:', error);
          alert('Error creating quiz!');
        },
      });
    }
  }
}
