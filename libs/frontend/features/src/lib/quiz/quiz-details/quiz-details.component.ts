import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { IQuizInfo } from '@avans-nx-workshop/shared/api';
import { CommentService, CreateCommentDto, IComment } from '../../comments/comments.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../../common/src/lib/auth/auth/auth.service';
import { environment } from '@avans-nx-workshop/shared/util-env';

@Component({
  selector: 'avans-nx-workshop-quiz-details',
  templateUrl: './quiz-details.component.html',
})
export class QuizDetailsComponent implements OnInit {
  quiz?: IQuizInfo;
  isFavorited = false;
  userId!: string;
  isAdmin = false; 
  comments: IComment[] = [];
  newComment = ''; 
  editingComment: IComment | null = null;
  rating?: number;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private commentService: CommentService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.decodeToken();

    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe((quiz) => {
        this.quiz = quiz;
        this.quizService.getUserFavorites(this.userId).subscribe((favorites) => {
          this.isFavorited = favorites.some((fav: any) => fav.quizId === quizId);
        });
        this.loadComments(quizId);
      });
    }
  }

  decodeToken(): void {
    const token = localStorage.getItem('currentuser');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    try {
      const cleanedToken = token.replace(/^"(.+)"$/, '$1'); 
      const decodedPayload = JSON.parse(atob(cleanedToken.split('.')[1]));
      this.userId = decodedPayload?.user_id; 
      
      if (this.userId) {
        const apiUrl = `${environment.dataApiUrl}/user/${this.userId}`;
        this.http.get<any>(apiUrl).subscribe(
          (response) => {
            this.isAdmin = response?.results?.role === 'admin';  
          },
          (error) => console.error('Failed to fetch user role:', error)
        );
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  toggleFavorite(): void {
    this.decodeToken();
    if (!this.quiz || !this.quiz._id || !this.userId) return;

    if (this.isFavorited) {
      this.quizService.unfavoriteQuiz(this.userId, this.quiz._id).subscribe(() => {
        this.isFavorited = false;
      });
    } else {
      this.quizService.favoriteQuiz(this.userId, this.quiz._id).subscribe(() => {
        this.isFavorited = true;
      });
    }
  }

  startQuiz(): void {
    if (!this.quiz || !this.quiz._id) {
      console.error('Quiz ID not found');
      return;
    }

    this.router.navigate(['/runner', this.quiz._id]);
  }

  loadComments(quizId: string): void {
    this.commentService.getCommentsByQuizId(quizId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => console.error('Failed to load comments:', error)
    );
  }

  addComment(): void {
    if (!this.newComment.trim()) return;

    const commentData: CreateCommentDto = {
      quizId: this.quiz!._id,
      userId: this.userId,
      comment: this.newComment,
      rating: this.rating,
    };

    this.commentService.createComment(commentData).subscribe({
      next: (response) => {
        this.comments.push(response); 
        this.newComment = '';
      },
      error: (err) => console.error('Error adding comment:', err),
    });
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe(
      () => {
        this.comments = this.comments.filter((c) => c._id !== commentId);
      },
      (error) => console.error('Failed to delete comment:', error)
    );
  }


  editComment(comment: IComment): void {
    this.editingComment = { ...comment };
  }

  saveEdit(): void {
    if (!this.editingComment || !this.editingComment._id) return;

    this.commentService.updateComment(this.editingComment._id, this.editingComment).subscribe(
      (updatedComment) => {
        const index = this.comments.findIndex((c) => c._id === updatedComment._id);
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }
        this.editingComment = null;
      },
      (error) => console.error('Failed to save edited comment:', error)
    );
  }

  cancelEdit(): void {
    this.editingComment = null; 
  }
}
