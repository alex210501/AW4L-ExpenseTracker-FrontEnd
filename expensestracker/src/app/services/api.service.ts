import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

import { Credentials } from '../models/credentials';
import { Token } from '../models/token';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
const URL = 'https://alejandro-borbolla.com/expensestracker';
const LOGIN_URL = `${URL}/auth/login`;
const LOGOUT_URL = `${URL}/logout`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = '';

  constructor(private http: HttpClient,) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }  

  login(credentials: Credentials) {
    console.log('Login');
    console.log(LOGIN_URL);

    return this.http.post<Token>(LOGIN_URL, JSON.stringify(credentials), httpOptions).pipe(
      tap(token => {
        this.token = token.token;
        console.log(this.token);
      }),
      catchError(catchError(this.handleError<Token>('getHeroes'))),
    ).subscribe();
  }

  logout() {
    console.log('Logout')
  }
}
