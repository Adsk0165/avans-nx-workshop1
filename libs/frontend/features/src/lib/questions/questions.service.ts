import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { IQuestion } from '../../../../../shared/api/src/lib/models/question.interface' ;

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = `${environment.dataApiUrl}/questions`;

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<IQuestion[]> {
    return this.http.get<{ results: IQuestion[] }>(this.apiUrl).pipe(
      map(response => response.results) // Pak alleen de `results` array
    );
  }

  getQuestionById(id: string): Observable<IQuestion | undefined> {
    return this.http.get<IQuestion>(`${this.apiUrl}/${id}`);
  }

  createQuestion(question: Partial<IQuestion>): Observable<IQuestion> {
    const token = localStorage.getItem('currentuser');
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!cleanedToken) {
      throw new Error('No JWT token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);
    return this.http.post<IQuestion>(this.apiUrl, question, { headers });
  }

  updateQuestion(question: Partial<IQuestion>): Observable<IQuestion> {
    const token = localStorage.getItem('currentuser');
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!cleanedToken) {
      throw new Error('No JWT token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);
    return this.http.put<IQuestion>(`${this.apiUrl}/${question._id}`, question, { headers });
  }

  deleteQuestion(id: string): Observable<void> {
    const token = localStorage.getItem('currentuser');
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;

    if (!cleanedToken) {
      throw new Error('No JWT token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getMyQuestions(): Observable<IQuestion[]> {
    const token = localStorage.getItem('currentuser');
    const cleanedToken = token ? token.replace(/^"(.+)"$/, '$1') : null;
  
    if (!cleanedToken) {
      throw new Error('No JWT token found');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${cleanedToken}`);
    return this.http.get<{ results: IQuestion[] }>(`${this.apiUrl}/me`, { headers }).pipe(
      map(response => response.results) // 👈 hier pak je het juiste veld eruit
    );
  }
}
