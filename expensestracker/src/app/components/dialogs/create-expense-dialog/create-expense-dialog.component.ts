import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Expense } from 'src/app/models/expense';

/**
 * Data pass to the Dialog
 */
export interface ExpenseDialogData {
  spaceId: string;
}

@Component({
  selector: 'app-create-expense-dialog',
  templateUrl: './create-expense-dialog.component.html',
  styleUrls: ['./create-expense-dialog.component.css'],
})

/**
 * Show a dialog to create an expense
 */
export class CreateExpenseDialogComponent {
  expenseDescription = '';
  expenseCost = 0;

  /**
   * Constructor
   * @param dialogRef Reference to a dialog
   * @param data Data with the space ID
   * @param apiService Service to use the API
   * @param dialog Dialog
   */
  constructor(
    public dialogRef: MatDialogRef<CreateExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDialogData,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  /**
   * Callback used when create a new expense
   */
  onCreate() {
    this.apiService
      .createExpense(
        this.data.spaceId,
        this.expenseDescription,
        this.expenseCost,
        (err) => ErrorDialogComponent.openDialog(this.dialog, err.error)
      )
      .subscribe((result) => this.dialogRef.close(result as Expense));
  }
}
