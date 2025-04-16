import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { ApiResponse } from '@avans-nx-workshop/shared/api';

export interface IComment {
  _id: string;
  quizId: string;
  userId: string;
  comment: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  userName?: String;
}

export interface CreateCommentDto {
  quizId: string;
  userId: string;
  comment: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.dataApiUrl}/comments`;

  constructor(private http: HttpClient) {}


  
  getCommentsByQuizId(quizId: string): Observable<IComment[]> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${quizId}`).pipe(
      tap((response) => console.log('Raw API response:', response)),
      map((response) => response.results), 
      tap((comments) => comments.forEach((comment) => console.log('Comment:', comment)))
    );
  }

  createComment(commentData: CreateCommentDto): Observable<IComment> {
    const token = localStorage.getItem('currentuser');
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!cleanedToken) {
      throw new Error('No JWT token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);

    return this.http.post<IComment>(this.apiUrl, commentData, { headers });
  }


  updateComment(commentId: string, updatedData: Partial<CreateCommentDto>): Observable<IComment> {
    const token = localStorage.getItem('currentuser');
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!cleanedToken) {
      throw new Error('No JWT token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);

    return this.http.put<IComment>(`${this.apiUrl}/${commentId}`, updatedData, { headers });
  }


  deleteComment(commentId: string): Observable<void> {
    const token = localStorage.getItem('currentuser');
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!cleanedToken) {
      throw new Error('No JWT token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`, { headers });
  }

  getCommentsByUserId(userId: string): Observable<IComment[]> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/user/${userId}`).pipe(
      tap((response) => console.log('Raw API response for user comments:', response)),
      map((response) => response.results),
      tap((comments) =>
        comments.forEach((comment) => console.log('User Comment:', comment))
      )
    );
  }
}
