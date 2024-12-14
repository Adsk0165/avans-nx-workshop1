import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { QuizService } from '../quiz.service';
import { IQuizInfo } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-quiz-details',
  templateUrl: './quiz-details.component.html',
})
export class QuizDetailsComponent implements OnInit {
  quiz?: IQuizInfo;
  isFavorited = false;
  userId!: string; // Store the decoded user ID here

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.decodeToken(); // Decode the token to get the user ID

    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe((quiz) => {
        this.quiz = quiz;
        // Optionally check if the quiz is already favorited
        this.quizService.getUserFavorites(this.userId).subscribe((favorites) => {
          this.isFavorited = favorites.some((fav: any) => fav.quizId === quizId);
        });
      });
    }
  }

  decodeToken(): void {
    const token = localStorage.getItem('currentuser');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const cleanedToken = token.replace(/^"(.+)"$/, '$1'); // Remove surrounding quotes if any
      const decodedPayload = JSON.parse(atob(cleanedToken.split('.')[1]));
      this.userId = decodedPayload?.user_id; // Replace with the correct key for user ID in your token
      console.log('Decoded user ID:', this.userId);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  toggleFavorite(): void {
    this.decodeToken();
    if (!this.quiz || !this.quiz._id || !this.userId) return;

    if (this.isFavorited) {
      this.quizService.unfavoriteQuiz(this.userId,this.quiz._id).subscribe(() => {
        this.isFavorited = false;
      });
    } else {
      this.quizService.favoriteQuiz(this.userId,this.quiz._id).subscribe(() => {
        this.isFavorited = true;
      });
    }
  }

  startQuiz(): void {
    if (!this.quiz || !this.quiz._id) {
      console.error('Quiz ID not found');
      return;
    }

    this.router.navigate(['/runner', this.quiz._id]); // Navigate to Quiz Runner Component
  }
}
