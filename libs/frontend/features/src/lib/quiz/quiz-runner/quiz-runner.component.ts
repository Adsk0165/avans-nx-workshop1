import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';
import { QuestionService } from '../../questions/questions.service';
import { IQuestionFromQuestionInterface } from '@avans-nx-workshop/shared/api';

interface IQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: string[];
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
  isLoading: boolean = true;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id') || '';
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.quizService.getQuizById(this.quizId).subscribe(
      (quiz: any) => {
        this.quizTitle = quiz.title || '';
        this.quizDescription = quiz.description || '';

        if (quiz.questions && quiz.questions.length > 0) {
          // API quiz
          this.questions = quiz.questions.map((q: any) => ({
            question: q.question,
            correct_answer: q.correct_answer,
            incorrect_answers: q.incorrect_answers,
            answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          }));
          this.currentQuestion = this.questions[this.currentQuestionIndex];
          this.isLoading = false;
        } else if (quiz.questionIds?.length > 0) {
          // Custom quiz → haal vragen op via de question service
          this.questionService.getMultipleQuestionsByIds(quiz.questionIds).subscribe(
            (customQuestions: IQuestionFromQuestionInterface[]) => {
              this.questions = customQuestions.map((q) => ({
                question: q.title,
                correct_answer: q.correctAnswer,
                incorrect_answers: q.options.filter((opt) => opt !== q.correctAnswer),
                answers: [...q.options].sort(() => Math.random() - 0.5),
              }));
              this.currentQuestion = this.questions[this.currentQuestionIndex];
              this.isLoading = false;
            },
            (error) => {
              console.error('Error loading custom questions:', error);
              this.isLoading = false;
            }
          );
        } else {
          console.warn('Geen vragen gevonden.');
          this.isLoading = false;
        }
      },
      (error) => {
        console.error('Error loading quiz:', error);
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

    setTimeout(() => this.nextQuestion(), 2000);
  }

  nextQuestion(): void {
    this.showFeedback = false;
    this.selectedAnswer = null;

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.currentQuestion = null;
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
