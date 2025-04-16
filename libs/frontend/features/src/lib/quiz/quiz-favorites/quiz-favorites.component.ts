import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { IQuizInfo } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-favorites',
  templateUrl: './quiz-favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favoriteQuizzes: IQuizInfo[] = [];
  userId!: string;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.decodeToken();
    if (this.userId) {
      this.fetchFavorites();
    }
  }

  decodeToken(): void {
    const token = localStorage.getItem('currentuser');
    if (!token) {
      console.error('geen token in localstorage');
      return;
    }

    try {
      const cleanedToken = token.replace(/^"(.+)"$/, '$1');
      const decodedPayload = JSON.parse(atob(cleanedToken.split('.')[1]));
      this.userId = decodedPayload?.user_id;
      console.log('Decoded user ID', this.userId);
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  }

  fetchFavorites(): void {
    this.quizService.getUserFavorites(this.userId).subscribe(
      (favoritesResponse: any) => {
        console.log('raw favorite quizzes response', favoritesResponse);
        if (favoritesResponse && favoritesResponse.results && Array.isArray(favoritesResponse.results.records)) {
          const quizzes = favoritesResponse.results.records.map(async (record: any) => {
            const quizId = record._fields[1]?.properties?.id;
  
            if (quizId) {
              console.log('fetch details for quiz ID:', quizId);
              return this.quizService.getQuizById(quizId).toPromise(); 
            } else {
              console.log('quiz ID not found for record:', record);
              return undefined; 
            }
          });
  
          Promise.all(quizzes).then(fetchedQuizzes => {
            this.favoriteQuizzes = fetchedQuizzes.filter((quiz): quiz is IQuizInfo => !!quiz);
            console.log('Fetched full favorite quizzes:', this.favoriteQuizzes);
          });
        } else {
          console.error('favoritesResponse is not in the expected format:', favoritesResponse);
        }
      },
      (error) => {
        console.error('Failed to fetch favorites:', error);
      }
    );
  }
  
  
  
  
  
  

  removeFavorite(quizId: string): void {
    this.quizService.unfavoriteQuiz(this.userId,quizId).subscribe(() => {
      this.favoriteQuizzes = this.favoriteQuizzes.filter(
        (quiz) => quiz._id !== quizId
      );
    });
  }
}
