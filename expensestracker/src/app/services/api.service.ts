import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Credentials } from '../models/credentials';
import { Collaborator } from '../models/collaborator';
import { Expense } from '../models/expense';
import { Space } from '../models/space';
import { Token } from '../models/token';
import { User } from '../models/user';
import { Category } from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
const URL = 'https://alejandro-borbolla.com/expensestracker';
const LOGIN_URL = `${URL}/auth/login`;
const LOGOUT_URL = `${URL}/auth/logout`;

// User Management
const CREATE_USER_URL = `${URL}/user`;

// Space
const SPACES_URL = `${URL}/space`;
const SPACE_ID_URL = `${URL}/space/:space_id`;

// Expense
const EXPENSE_URL = `${URL}/space/:space_id/expense`;
const EXPENSE_ID_URL = `${URL}/space/:space_id/expense/:expense_id`;

// Category
const CATEGORY_URL = `${URL}/space/:space_id/category`;
const CATEGORY_ID_URL = `${URL}/space/:space_id/category/:category_id`;

// Space User
const SPACE_USER_URL = `${URL}/space/:space_id/user`;
const SPACE_USER_ID_URL = `${URL}/space/:space_id/user/:username`;

// Define the ErrorCallback type
type ErrorCallback = (error: any) => void;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token = '';

  constructor(private http: HttpClient) { }

  private handleError(error: any, errorCallback?: ErrorCallback): Observable<never> {
    if (errorCallback) {
      errorCallback(error);
    }

    console.error('An error occurred:', error);

    return of();
  }

  login(credentials: Credentials, errorCallback?: ErrorCallback) {
    return this.http.post<Token>(LOGIN_URL, JSON.stringify(credentials), httpOptions).pipe(
      tap(token => {
        this.token = token.token;
        httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${this.token}`);
      }),
      catchError((err) => this.handleError(err, errorCallback)),
    );
  }

  logout() {
    return this.http.post(LOGOUT_URL, {}, httpOptions)
    //   .pipe(catchError(this.handleError('logout')));
  }

  createUser(user: User, errorCallback?: ErrorCallback) {
    return this.http.post<User>(CREATE_USER_URL, JSON.stringify(user), httpOptions).pipe(
      tap(_ => console.log('User created')),
      catchError((err) => this.handleError(err, errorCallback)),
    );
  }

  getSpaces(): Observable<Space[]> {
    return this.http.get<Space[]>(SPACES_URL, httpOptions);
  }

  createSpace(spaceName: string, spaceDescription: string): Observable<Object> {
    const spaceJson = {
      space_name: spaceName,
      space_description: spaceDescription,
    };

    return this.http.post(SPACES_URL, spaceJson, httpOptions)
    //   .pipe(catchError(this.handleError<Object>('createSpace')));
  }

  patchSpace(space: Space): Observable<Space> {
    const spaceJson = {
      space_name: space,
      space_description: space.space_description,
    };

    return this.http.patch<Space>(
      SPACE_ID_URL.replace(':space_id', space.space_id),
      spaceJson,
      httpOptions,
    )
    // .pipe(catchError(this.handleError<Space>('updateSpace')));
  }

  deleteSpace(spaceId: string) {
    return this.http.delete(
      SPACE_ID_URL.replace(':space_id', spaceId),
      httpOptions,
    )
    // .pipe(catchError(this.handleError<Object>('deleteSpace')));
  }

  getExpensesFromSpaceId(spaceId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(EXPENSE_URL.replace(':space_id', spaceId), httpOptions);
  }

  createExpense(
    spaceId: string, 
    expenseDescription: 
    string, expenseCost: number): Observable<Expense> {
    const expenseJson = {
      expense_description: expenseDescription,
      expense_cost: expenseCost,
      expense_date: new Date(),
    };

    return this.http.post<Expense>(
      EXPENSE_URL.replace(':space_id', spaceId), 
      expenseJson, 
      httpOptions).pipe(
        // catchError(this.handleError<Expense>('Create Expense')),
      );
  }

  patchExpense(spaceId: string, expense: Expense): Observable<Map<string, string>> {
    let expenseJson = {
      expense_description: expense.expense_description,
      expense_cost: expense.expense_cost,
      expense_category: expense.expense_category ?? null,
    };

    console.log(expenseJson);

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

  getCategoriesFromSpace(spaceId: string): Observable<Category[]> {
    return this.http.get<Category[]>(
      CATEGORY_URL.replace(':space_id', spaceId),
      httpOptions,
    )
    // .pipe(catchError(this.handleError<Category[]>('getCategories')));
  }

  createCategoryToSpace(spaceId: string, categoryTitle: string): Observable<Category> {
    return this.http.post<Category>(
      CATEGORY_URL.replace(':space_id', spaceId),
      { category_title: categoryTitle },
      httpOptions
    )
    // .pipe(catchError(this.handleError<Category>('createCategory')));
  }

  deleteCategoryFromSpace(spaceId: string, categoryId: string): Observable<Category> {
    return this.http.delete<Category>(
      CATEGORY_ID_URL.replace(':space_id', spaceId).replace(':category_id', categoryId),
      httpOptions,
    )
    // .pipe(catchError(this.handleError<Category>('deleteCategory')));
  }

  addUserToSpace(spaceId: string, username: string): Observable<Collaborator> {
    return this.http.post<Collaborator>(
      SPACE_USER_URL.replace(':space_id', spaceId),
      { username },
      httpOptions,
    )
    // .pipe(catchError(this.handleError<Collaborator>('addUserToSpace')));
  }

  deleteUserFromSpace(spaceId: string, username: string): Observable<Object> {
    return this.http.delete(
      SPACE_USER_ID_URL.replace(':space_id', spaceId).replace(':username', username),
      httpOptions,
    )
    // .pipe(catchError(this.handleError<Object>('deleteUserFromSpace')));
  }
}
