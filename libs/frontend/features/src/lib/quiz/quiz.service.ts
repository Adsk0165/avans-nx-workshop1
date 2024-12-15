import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
          quizzes.forEach((quiz) => console.log('Quiz Title:', quiz.title)); 
        })
        );
  }

  // getUserAsync(): Observable<IUserInfo[]>{
  //   return this.http.get<ApiResponse<any>>(environment.dataApiUrl + '/user').pipe(
  //    tap((response) => console.log(response)),
  //    map((response) => response.results),
  //    tap((response) => console.log(response))c
  //   );
 //}

 getQuizById(id: string): Observable<IQuizInfo | undefined> {
  return this.http.get<ApiResponse<any>>(`${environment.dataApiUrl}/quiz/${id}`).pipe(
    tap((response) => console.log('Raw response from API:', response)),
    map((response) => response.results|| undefined), 
    tap((user) => {
      if (!user) {
        console.error('No user found for the given ID:', id);
      }
    })
  );
}

  createQuiz(quiz: Partial<IQuiz>): Observable<IQuiz> {
    const token = localStorage.getItem('currentuser');
    
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!token) {
      throw new Error('No JWT token found');
    }
    
    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${cleanedToken}`
    );
    return this.http.post<IQuiz>(this.apiUrl + "/generate-from-api", quiz, { headers });
  }

  updateQuiz(quiz: Partial<IQuizInfo>): Observable<IQuizInfo> {
    const quizid = quiz._id;
    const token = localStorage.getItem('currentuser');
    
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!token) {
      throw new Error('No JWT token found');
    }
    
    const headers = new HttpHeaders().set(
      'Authorization', `Bearer ${cleanedToken}`
    );

    return this.http.put<IQuizInfo>(`${this.apiUrl}/${quizid}`, quiz, { headers });
  }
  

  
  deleteQuiz(id: string): Observable<void> {
    const quizid = id;
    const token = localStorage.getItem('currentuser'); 
  

    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;
  
    if (!cleanedToken) {
      throw new Error('No JWT token found');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);
  
   
    return this.http.delete<void>(`${this.apiUrl}/${quizid}`, { headers });
  }

  favoriteQuiz(userId: string, quizId: string): Observable<any> {
    return this.http.post(`https://rcmnd-api-g4dxdkcqd4fsaghr.westeurope-01.azurewebsites.net/api/users/${userId}/favorite/${quizId}`, {});
  }

  unfavoriteQuiz(userId: string, quizId: string): Observable<any> {
    return this.http.post(`https://rcmnd-api-g4dxdkcqd4fsaghr.westeurope-01.azurewebsites.net/api/users/${userId}/unfavorite/${quizId}`, {});
  }

  getUserFavorites(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`https://rcmnd-api-g4dxdkcqd4fsaghr.westeurope-01.azurewebsites.net/api/users/${userId}/favourites`);
  }

  
  
}
