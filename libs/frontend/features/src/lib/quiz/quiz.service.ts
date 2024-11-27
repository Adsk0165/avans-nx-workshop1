import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { IQuiz, IQuizInfo } from '@avans-nx-workshop/shared/api';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
    private apiUrl = `${environment.dataApiUrl}/quiz`;

  constructor(private http: HttpClient) {}

  getAllQuizzes(): Observable<IQuiz[]> {
    return this.http.get<IQuiz[]>(this.apiUrl);
  }

  getQuizById(id: string): Observable<IQuiz> {
    return this.http.get<IQuiz>(`${this.apiUrl}/${id}`);
  }

  createQuiz(quiz: Partial<IQuiz>): Observable<IQuiz> {
    return this.http.post<IQuiz>(this.apiUrl, quiz);
  }

  updateQuiz(id: string, quiz: Partial<IQuiz>): Observable<IQuiz> {
    return this.http.put<IQuiz>(`${this.apiUrl}/${id}`, quiz);
  }

  deleteQuiz(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
