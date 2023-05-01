import { Injectable } from '@angular/core';

import { Category } from '../models/category';
import { Expense } from '../models/expense';
import { Space } from '../models/space';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  spaces: Space[] = [];
  expenses: Expense[] = [];
  categories: Category[] = [];

  constructor() { }

  findSpaceById(spaceId: string): Space | undefined {
    return this.spaces.find(({ space_id }) => space_id === spaceId);
  }

  removeSpaceById(spaceId: string) {
    this.spaces = this.spaces.filter(space => space.space_id != spaceId);
    return this.spaces;
  }

  findExpenseById(expenseId: string): Expense | undefined {
    return this.expenses.find(({ expense_id }) => expense_id === expenseId);
  }

  findCategoryById(categoryId: string): Category | undefined {
    return this.categories.find(( {category_id }) => category_id == categoryId);
  }
}
