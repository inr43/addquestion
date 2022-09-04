import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiQuestionURL = environment.apiQuestionURL;

  constructor(private http: HttpClient) { }

   addQuestion(question: Question) : Observable<any> {
    return this.http.post<any>(`${this.apiQuestionURL}/add`, question);
  }
 
  addQuestionWithImage(question: Question, questionData: FormData, withImage: boolean) : Observable<any> {
    if ( withImage)
      return this.http.post<any>(`${this.apiQuestionURL}/addimage`, questionData); 
    else   
      return this.http.post<any>(`${this.apiQuestionURL}/add`, question);
  }

  addAnswerImage(answerImage: FormData) : Observable<Question> {
      return this.http.post<Question>(`${this.apiQuestionURL}/addanswersimage`, answerImage); 
  }

  getQuestions(key: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiQuestionURL}/get/${key}`);
  }

  updateQuestion(questionData: Question, id: string ): Observable<any> {    
    return this.http.put<any>(`${this.apiQuestionURL}/${id}`, questionData);
  }

  deleteQuestion(questionId: string) : Observable<any> {
    return this.http.delete<any> (`${this.apiQuestionURL}/${questionId}`)
  }
 
}
