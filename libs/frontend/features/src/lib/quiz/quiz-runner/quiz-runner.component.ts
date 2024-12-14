import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';

interface IQuestion {
  type: string; // "boolean" or "multiple"
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: string[]; // Add this optional property
}

@Component({
  selector: 'app-quiz-runner',
  templateUrl: './quiz-runner.component.html',
})
export class QuizRunnerComponent implements OnInit {
  quizId: string = '';
  quizTitle: string = '';
  quizDescription: string = '';
  questions: IQuestion[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: IQuestion | null = null;
  selectedAnswer: string | null = null;
  showFeedback: boolean = false;
  correctAnswersCount: number = 0;
  isLoading: boolean = true;  // Loading state

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id') || '';
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.quizService.getQuizById(this.quizId).subscribe(
      (quiz: any) => {
        // Guard against missing or unexpected properties
        if (quiz && quiz.questions) {
          // Use the actual properties of the quiz
          this.quizTitle = quiz.title || '';
          this.quizDescription = quiz.description || '';
          this.questions = quiz.questions
            ? quiz.questions.map((q: any) => ({
                ...q,
                answers: [...q.incorrect_answers, q.correct_answer].sort(() =>
                  Math.random() > 0.5 ? 1 : -1
                ),
              }))
            : [];

          this.currentQuestion = this.questions[this.currentQuestionIndex];
        } else {
          console.error('Invalid quiz data:', quiz);
        }
      },
      (error) => {
        console.error('Error loading quiz:', error);
      },
      () => {
        // Set isLoading to false after data is loaded or an error occurs
        this.isLoading = false;
      }
    );
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
    this.showFeedback = true;

    if (answer === this.currentQuestion?.correct_answer) {
      this.correctAnswersCount++;
    }

    setTimeout(() => this.nextQuestion(), 2000); // Move to next question after 2 seconds
  }

  nextQuestion(): void {
    this.showFeedback = false;
    this.selectedAnswer = null;

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.currentQuestion = null; // End quiz
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.showFeedback = false;
    this.selectedAnswer = null;
  }
}
