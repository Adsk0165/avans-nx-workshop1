import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuiz } from '@avans-nx-workshop/shared/api';
import { QuizService } from '@avans-nx-workshop/features';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'quiz-edit-component',
  templateUrl: 'quiz-edit.component.html',
})
export class QuizEditComponent implements OnInit {
  quizForm: FormGroup;
  quizId: string | null = null;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Initialize the form group
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      difficulty: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the quiz ID from the route parameters
    this.quizId = this.route.snapshot.paramMap.get('id');

    if (this.quizId) {
      this.loadQuiz(this.quizId);
    }
  }

  loadQuiz(id: string): void {
    this.quizService.getQuizById(id).subscribe((quiz) => {
      if (quiz) {
        // Populate the form with quiz data
        this.quizForm.patchValue({
          Title: quiz.title,
          difficulty: quiz.difficulty,
          description: quiz.description,
        });
      }
    });
  }

  saveQuiz(): void {
    if (this.quizForm.valid && this.quizId) {
      const updatedQuiz: IQuiz = {
        ...this.quizForm.value,
        _id: this.quizId,
      };

      this.quizService.updateQuiz(updatedQuiz._id,updatedQuiz).subscribe(() => {
        this.router.navigate(['/quizzes']); // Redirect to the quiz list or another page
      });
    }
  }
}
