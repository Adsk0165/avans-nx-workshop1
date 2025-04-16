import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender, IQuizIdentity, IQuiz } from "@avans-nx-workshop/shared/api";
import { QuizService } from '../quiz.service';
import { IQuizInfo } from '@avans-nx-workshop/shared/api';
import { ValueFromArray } from 'rxjs';

@Component({
    selector: 'avans-nx-workshop-quiz-list',
    templateUrl: './quiz-list.component.html',
})

export class QuizListComponent implements OnInit {
  categoryLabels = [
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
  
    constructor(private quizService: QuizService) {} 
  
    ngOnInit(): void {
      this.quizService.getAllQuizzes().subscribe((quizzes) => {
        console.log('API Response:', quizzes);
        this.quizzes = quizzes;
      });
    }

    getCategoryLabel(id: number): string {
      const category = this.categoryLabels.find(category => category.value === id);
      return category ? category.label : 'Onbekend';
    }

    deleteQuiz(id: string): void {
      if (confirm('Weet je zeker dat je de' + ' deze quiz '+  'wilt verwijderen')) {
          this.quizService.deleteQuiz(id).subscribe({
              next: () => {
                  alert('quiz succesvol verwijderd');
                  this.quizzes = this.quizzes.filter(quiz => quiz._id !== id);
              },
              error: (err) => {
                  console.error('error met verwijderen quiz:', err);
                  alert('Het is niet gelukt om de quiz te verwijderen.' +  err);
              },
          });
      }
  }
}
