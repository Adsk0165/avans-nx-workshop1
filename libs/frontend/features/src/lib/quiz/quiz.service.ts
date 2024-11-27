import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { IQuiz, IQuizIdentity, IQuizInfo } from '@avans-nx-workshop/shared/api';
import { ApiResponse } from '@avans-nx-workshop/shared/api'

@Injectable({
  providedIn: 'root',
})
export class QuizService {
    private apiUrl = `${environment.dataApiUrl}/quiz`;

  constructor(private http: HttpClient) {}

  getAllQuizzes(): Observable<IQuizInfo[]> {
    return this.http.get<ApiResponse<any>>(environment.dataApiUrl + '/quiz').pipe(
         tap((response) => console.log(response)),
         map((response) => response.results),
         tap((response) => console.log(response)),
         tap((quizzes) => {
          quizzes.forEach((quiz) => console.log('Quiz Title:', quiz.name)); // Log only the title
        })
        );
  }

  // getUserAsync(): Observable<IUserInfo[]>{
  //   return this.http.get<ApiResponse<any>>(environment.dataApiUrl + '/user').pipe(
  //    tap((response) => console.log(response)),
  //    map((response) => response.results),
  //    tap((response) => console.log(response))
  //   );
 //}

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
