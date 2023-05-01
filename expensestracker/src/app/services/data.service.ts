import { Injectable } from '@angular/core';

import { Space } from '../models/space';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  spaces: Space[] = [];
  expenses: Expense[] = [];

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
}
