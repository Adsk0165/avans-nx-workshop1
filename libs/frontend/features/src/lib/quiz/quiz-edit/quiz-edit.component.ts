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
  quizzes: IQuizInfo[] = [];
  quiz: IQuizInfo = {
    title: '',
    description: '',
    difficulty: QuizDifficulty.Easy, // default role
    isActive: false,
    _id: '',
    createdAt: undefined,
    updatedAt: undefined
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
    this.quizservice.updateQuiz(this.quiz).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.router.navigate(['/quizzes']);  
      },
      error: (err) => {
        console.error("Error updating user:", err);
        alert('Could not update user.');
      },
    });
  }

}
