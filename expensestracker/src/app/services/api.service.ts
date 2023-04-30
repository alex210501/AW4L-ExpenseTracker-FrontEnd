import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Credentials } from '../models/credentials';
import { Expense } from '../models/expense';
import { Space } from '../models/space';
import { Token } from '../models/token';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
const URL = 'https://alejandro-borbolla.com/expensestracker';
const LOGIN_URL = `${URL}/auth/login`;
const LOGOUT_URL = `${URL}/logout`;

// User Management
const CREATE_USER_URL = `${URL}/user`;

// Space
const SPACES_URL = `${URL}/space`;

// Expense
const EXPENSE_URL = `${URL}/space/:space_id/expense`;
const EXPENSE_ID_URL = `${URL}/space/:space_id/expense/:expense_id`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = '';

  constructor(private http: HttpClient) { }

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
        httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.token}`);
      }),
      catchError(catchError(this.handleError<Token>('login'))),
    );
  }

  logout() {
    console.log('Logout')
  }

  createUser(user: User) {
    this.http.post<User>(CREATE_USER_URL, JSON.stringify(user), httpOptions).pipe(
      tap(_ => console.log('User created')),
      catchError(this.handleError<User>('createUser')),
    ).subscribe();
  }

  getSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(SPACES_URL, httpOptions);
  }

  getExpensesFromSpaceId(spaceId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(EXPENSE_URL.replace(':space_id', spaceId), httpOptions);
  }

  createExpense(spaceId: string, expense: Expense): Observable<Map<string, string>> {
    const expenseJson = {
      expense_description: expense.expense_description,
      expense_cost: expense.expense_cost,
      expense_date: new Date(),
    };

    return this.http.post<Map<string, string>>(
      EXPENSE_URL.replace(':space_id', spaceId), 
      expenseJson, 
      httpOptions).pipe(
        tap(a => console.log(a)),
        catchError(this.handleError<Map<string, string>>('Create Expense')),
      );
  }

  patchExpense(spaceId: string, expense: Expense): Observable<Map<string, string>> {
    let expenseJson = {
      expense_description: expense.expense_description,
      expense_cost: expense.expense_cost,
    };

    return this.http.patch<Map<string, string>>(
      EXPENSE_ID_URL.replace(':space_id', spaceId).replace(':expense_id', expense.expense_id),
      expenseJson, 
      httpOptions);
  }

  deleteExpense(spaceId: string, expenseId: string): Observable<Expense> {
    return this.http.delete<Expense>(
      EXPENSE_ID_URL.replace(':space_id', spaceId).replace(':expense_id', expenseId), 
      httpOptions);
  }
}
