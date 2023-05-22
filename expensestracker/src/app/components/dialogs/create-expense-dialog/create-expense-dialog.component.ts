import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
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
    private dialog: MatDialog,
  ) {}

  onCreate() {
    this.apiService.createExpense(
        this.data.spaceId, 
        this.expenseDescription, 
        this.expenseCost,
        (err) => ErrorDialogComponent.openDialog(this.dialog, err.error))
      .subscribe(result => this.dialogRef.close(result as Expense));
  }
}
