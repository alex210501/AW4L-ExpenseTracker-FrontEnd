import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { Expense } from 'src/app/models/expense';

export interface ExpenseDialogData {
  spaceId: string,
}

@Component({
  selector: 'app-create-expense-dialog',
  templateUrl: './create-expense-dialog.component.html',
  styleUrls: ['./create-expense-dialog.component.css']
})
export class CreateExpenseDialogComponent {
  expenseDescription = '';
  expenseCost = 0;

  constructor(
    public dialogRef: MatDialogRef<CreateExpenseDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDialogData,
  ) {}

  onCreate() {
    this.apiService.createExpense(this.data.spaceId, this.expenseDescription, this.expenseCost)
      .subscribe(result => this.dialogRef.close(result as Expense));
  }
}
