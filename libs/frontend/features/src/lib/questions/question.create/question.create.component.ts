import { Component } from '@angular/core';
import { QuestionService } from '../questions.service';
import { ICreateQuestion, QuestionDifficulty } from '../../../../../../shared/api/src/lib/models/question.interface';

@Component({
  selector: 'app-question-create',
  templateUrl: './question.create.component.html',
  styleUrls: ['./question.create.component.css']
})
export class QuestionCreateComponent {
  newQuestion: ICreateQuestion = {
    title: '',
    description: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    difficulty: QuestionDifficulty.Medium,
    tags: []
  };

  newTags: string = '';
  feedback: string = '';

  constructor(private questionService: QuestionService) {}

  onSubmit(): void {
    const tagsArray = this.newTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const questionToSubmit: ICreateQuestion = {
      ...this.newQuestion,
      tags: tagsArray
    };

    this.questionService.createQuestion(questionToSubmit).subscribe(() => {
      this.feedback = 'Vraag succesvol aangemaakt!';
      this.resetForm();
    });
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  get validAnswerCount(): number {
    return this.newQuestion.options.filter(opt => opt && opt.trim().length >= 1).length;
  }
  

  resetForm(): void {
    this.newQuestion = {
      title: '',
      description: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      difficulty: QuestionDifficulty.Medium,
      tags: []
    };
    this.newTags = '';
  }
}
