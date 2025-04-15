import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../questions.service';
import { ICreateQuestion, IQuestion, QuestionDifficulty } from '../../../../../../shared/api/src/lib/models/question.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  questions: IQuestion[] = [];
  
   

  constructor(private questionService: QuestionService,private router: Router) {}
  // Removed duplicate router declaration

  ngOnInit(): void {
    this.loadOwnQuestions();
  }

  loadOwnQuestions(): void {
    const token = localStorage.getItem('currentuser');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const cleanedToken = token.replace(/^"(.+)"$/, '$1');
    const payload = JSON.parse(atob(cleanedToken.split('.')[1]));
    const userId = payload?.user_id;
  
    if (!userId) {
      console.error('No user ID found in token');
      return;
    }
  
    this.questionService.getMyQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }
  

  createQuestion(): void {
    const newQuestion: ICreateQuestion = {
      title: 'New Question',
      description: 'This is a new question.',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 1',
      difficulty: QuestionDifficulty.Medium,
      tags: ['example', 'sample'],
    };
  
    this.questionService.createQuestion(newQuestion).subscribe((createdQuestion) => {
      this.questions.push(createdQuestion as IQuestion);  
    });
  }
  

  deleteQuestion(id: string): void {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.questions = this.questions.filter((q) => q._id !== id);
    });
  }

  editQuestion(id: string): void {
    this.router.navigate([`/questionedit/${id}`]);
  }
  
}