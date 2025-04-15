import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import {IQuestionFromQuestionInterface,Iupdatequestion,Diff} from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
})
export class QuestionEditComponent implements OnInit {
  questionId!: string;
  question!: IQuestionFromQuestionInterface;
  updatedQuestion: Iupdatequestion = {
    title: '',
    description: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    difficulty: Diff.Medium,
    tags: [],
  };
  tagString = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('id')!;
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.questionService.getQuestionById(this.questionId).subscribe((q: any) => {
      const vraag = q.results; 
            
  
      this.updatedQuestion = {
         title: vraag.title ?? '',
        description: vraag.description ?? '',
        options: Array.isArray(vraag.options) ? [...vraag.options] : ['', '', '', ''],
        correctAnswer: vraag.correctAnswer ?? '',
        difficulty: vraag.difficulty ?? 'Medium',
        tags: vraag.tags ?? [],
      };
  
      this.tagString = vraag.tags?.join(', ') || '';
    });
  }
  
  

  onSubmit(): void {
    this.updatedQuestion.tags = this.tagString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => !!t);

    this.questionService
      .updateQuestion({ _id: this.questionId, ...this.updatedQuestion })
      .subscribe(() => {
        this.router.navigate(['/questions']);
      });
  }

  navigateBack(): void {
    this.router.navigate(['/questions']);
  }
  
  trackByIndex(index: number, _: any): number {
    return index;
  }
  
}
