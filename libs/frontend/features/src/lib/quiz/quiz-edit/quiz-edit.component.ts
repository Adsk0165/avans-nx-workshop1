import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserRole, UserGender, IQuizInfo, QuizDifficulty, IQuiz } from "@avans-nx-workshop/shared/api";
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styles: []
})
export class QuizEditComponent implements OnInit {

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
    difficulty: QuizDifficulty.Easy,
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

  ngOnInit(): void {
    const quizid = this.route.snapshot.paramMap.get('id');
    if (quizid) {
      this.loadUserData(quizid);
    }
  }

  private loadUserData(id: string): void {
    this.quizservice.getQuizById(id).subscribe(quizData => {
      if (quizData) {
        this.quiz = quizData; 
      } else {
        console.error("User not found!");
        
      }
    });
  }
  
  saveChanges(): void {
    if (typeof this.quiz.category !== 'number') {
      this.quiz.category = Number(this.quiz.category);
    }

    this.quizservice.updateQuiz(this.quiz).subscribe({
      next: () => {
        alert('User succesvol geupdate');
        this.router.navigate(['/quizzes']);  
      },
      error: (err) => {
        console.error("Error updating user:", err);
        alert('user kon niet geupdate worden.');
      },
    });
  }

}
