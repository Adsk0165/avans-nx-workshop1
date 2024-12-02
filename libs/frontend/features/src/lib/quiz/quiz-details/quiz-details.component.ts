import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';// Assuming you have a service for fetching users
import { IQuizInfo } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-quiz-details',
  templateUrl: './quiz-details.component.html',
})
export class QuizDetailsComponent implements OnInit {
  quiz?: IQuizInfo;

  constructor(
    private route: ActivatedRoute, 
    private Quizservice: QuizService 
  ) {}

  ngOnInit(): void {
    const quizid = this.route.snapshot.paramMap.get('id');  
    if (quizid) {
      this.Quizservice.getQuizById(quizid).subscribe(user => {
        this.quiz = user;  
      });
    }
  }
}
