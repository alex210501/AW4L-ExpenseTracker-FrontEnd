import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/models/category';
import { CreateExpenseDialogComponent } from '../dialogs/create-expense-dialog/create-expense-dialog.component';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { Space } from 'src/app/models/space';
import { Expense } from 'src/app/models/expense';
import { ShowQrcodeDialogComponent } from '../dialogs/show-qrcode-dialog/show-qrcode-dialog.component';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css'],
})

/**
 * Show the expenses in a space
 */
export class UserSpaceComponent {
  spaceId = '';
  space?: Space;
  expenses: Expense[] = [];
  expense: Expense | null = null;
  expenseToEdit: Expense | null = null;
  category: Category | null = null;
  editMode = false;

  /**
   * Constructor
   * @param route Use to get the parameters passed to a route
   * @param location Go back to history
   * @param router Used to change the route
   * @param apiService Service to access the API
   * @param dataService Service to access the shared data
   * @param errorDialog Dialog to display an error
   * @param showQrCodeDialog Dialog to display a QR code
   */
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private apiService: ApiService,
    public dataService: DataService,
    public errorDialog: MatDialog,
    public showQrCodeDialog: MatDialog
  ) {}

  /**
   * Initialize components
   */
  ngOnInit() {
    // Get space ID from path
    this.spaceId = this.route.snapshot.paramMap.get('space_id') ?? '';

    // Clear the expenses array from dataService
    this.dataService.clearExpenses();

    // Get new expenses from API
    this.apiService
      .getExpensesFromSpaceId(this.spaceId)
      .subscribe(
        (expenses) => (this.dataService.expenses = expenses.reverse())
      );

    // Get category from API
    this.apiService
      .getCategoriesFromSpace(this.spaceId)
      .subscribe((categories) => (this.dataService.categories = categories));

    // Get space from its ID
    this.space = this.dataService.findSpaceById(this.spaceId);
    this._loadCategory();
  }

  /**
   * Callback to display information of an expense
   * @param expenseId ID of the expense
   */
  onExpense(expenseId: string) {
    this.expense = this.dataService.findExpenseById(expenseId) as Expense;

    if (this.expense) {
      this.category =
        this.dataService.findCategoryById(
          this.expense.expense_category ?? ''
        ) ?? null;
      this.expenseToEdit = new Expense(this.expense);
    }
  }

  /**
   * Open a dialog to create an expense
   */
  openCreateExpenseDialog() {
    const dialogRef = this.errorDialog.open(CreateExpenseDialogComponent, {
      data: { spaceId: this.spaceId },
    });

    // Get expense from dialog
    dialogRef.afterClosed().subscribe((expense) => {
      if (expense) {
        this.dataService.expenses.push(expense);
      }
    });
  }

  /**
   * Go back to the previous screen
   */
  goBack() {
    this.location.back();
  }

  /**
   * Open a dialog to show a QR code
   */
  showQrCode() {
    ShowQrcodeDialogComponent.openDialog(this.showQrCodeDialog, this.spaceId);
  }

  /**
   * Callback to go to the edit mode
   */
  onEdit() {
    this.editMode = !this.editMode;
  }

  /**
   * Callback to delete an expense
   */
  onDelete() {
    if (this.expense) {
      this.apiService
        .deleteExpense(this.spaceId, this.expense.expense_id)
        .subscribe((_) => {
          this.router.navigate([`space/${this.spaceId}`]);
          this.dataService.removeExpenseById(this.expense!.expense_id);
          this.expense = null;
        });
    }
  }

  /**
   * Callback to save an expense
   */
  onSave() {
    if (this.expenseToEdit) {
      if (this.expense) {
        this.expense.expense_id = this.expenseToEdit.expense_id;
        this.expense.expense_cost = this.expenseToEdit.expense_cost;
        this.expense.expense_description =
          this.expenseToEdit.expense_description;
        this.expense.expense_date = this.expenseToEdit.expense_date;
        this.expense.expense_space = this.expenseToEdit.expense_space;
        this.expense.expense_paid_by = this.expenseToEdit.expense_paid_by;
        this.expense.expense_category = this.expenseToEdit.expense_category;
      } else {
        this.expense = new Expense(this.expenseToEdit);
      }
      this.expense = this.expenseToEdit;
      this.editMode = false;
      this.apiService
        .patchExpense(this.spaceId, this.expense, (err) =>
          ErrorDialogComponent.openDialog(this.errorDialog, err.error)
        )
        .subscribe();
      this._loadCategory();
    }
  }

  /**
   * Callback to cancel the modification of an expense
   */
  onCancel() {
    this.editMode = false;
    this.expenseToEdit = this.expense;
  }

  /**
   * Callback when the category has changed
   */
  onCategoryChange() {
    this._loadCategory();
  }

  /**
   * Load the category of a space
   */
  _loadCategory() {
    if (this.expenseToEdit?.expense_category == '0') {
      this.expenseToEdit.expense_category = null;
    }

    // If the category is '0', then we are on a null value
    if (this.expenseToEdit && this.expenseToEdit.expense_category) {
      this.category =
        this.dataService.findCategoryById(
          this.expenseToEdit.expense_category
        ) ?? null;
    }
  }
}
