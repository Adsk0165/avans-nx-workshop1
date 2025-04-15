import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service'; // Adjust the path to your service
import { IUserInfo, UserRole, UserGender, IQuizInfo, QuizDifficulty } from '@avans-nx-workshop/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IQuestionFromQuestionInterface,
  Diff,
  Iupdatequestion
} from '@avans-nx-workshop/shared/api';
import { QuestionService } from '../../questions/questions.service';


@Component({
  selector: 'avans-nx-workshop-quiz-add',
  templateUrl: './quiz-create.component.html',
})
export class QuizAddComponent implements OnInit{
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

  activeTab: 'api' | 'custom' = 'api';

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

    allOwnQuestions: IQuestionFromQuestionInterface[] = [];
    selectedQuestions: IQuestionFromQuestionInterface[] = [];

constructor(
    private quizservice: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private questionservice: QuestionService
  ) {}

  ngOnInit(): void {
    this.loadOwnQuestions()
  }

  loadOwnQuestions(): void {
    this.questionservice.getMyQuestions().subscribe((questions) => {
      this.allOwnQuestions = questions;
    });
  }

  toggleQuestionSelection(question: IQuestionFromQuestionInterface): void {
    const index = this.selectedQuestions.findIndex((q) => q._id === question._id);
    if (index >= 0) {
      this.selectedQuestions.splice(index, 1);
    } else {
      this.selectedQuestions.push(question);
    }
  }

  isSelected(question: IQuestionFromQuestionInterface): boolean {
    return this.selectedQuestions.some((q) => q._id === question._id);
  }

  onSubmit() {
    this.quiz.category = +this.quiz.category;
  
    if (this.activeTab === 'custom') {
      const payload = {
        ...this.quiz,
        questionIds: this.selectedQuestions.map((q) => q._id),
      };
  
      this.quizservice.createCustomQuiz(payload).subscribe({
        next: (response) => {
          console.log('Quiz met eigen vragen aangemaakt:', response);
          alert('Quiz succesvol aangemaakt met eigen vragen!');
          this.router.navigate(['/quizzes']);
        },
        error: (error) => {
          console.error('Fout bij aanmaken quiz:', error);
          alert('Er ging iets mis bij het aanmaken van de quiz.');
        },
      });
    } else {
     
      const payload = {
        ...this.quiz,
        creator: this.getUserIdFromToken(),
      };
  
      this.quizservice.createQuizWithAPI(payload).subscribe({
        next: (response) => {
          console.log('Quiz met API-vragen aangemaakt:', response);
          alert('Quiz succesvol aangemaakt met API-vragen!');
          this.router.navigate(['/quizzes']);
        },
        error: (error) => {
          console.error('Fout bij aanmaken API-quiz:', error);
          alert('Er ging iets mis bij het aanmaken van de quiz.');
        },
      });
    }
  }

  getUserIdFromToken(): string | undefined {
    const token = localStorage.getItem('currentuser');
    if (!token) return undefined;
  
    try {
      const cleanedToken = token.replace(/^"(.+)"$/, '$1');
      const decoded = JSON.parse(atob(cleanedToken.split('.')[1]));
      return decoded?.user_id;
    } catch (err) {
      console.error('Token decode failed:', err);
      return undefined;
    }
  }
  
  
}
