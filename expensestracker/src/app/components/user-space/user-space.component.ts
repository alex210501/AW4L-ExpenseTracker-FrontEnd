import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

import { ApiService } from 'src/app/services/api.service';
import { CreateExpenseDialogComponent } from '../dialogs/create-expense-dialog/create-expense-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { Space } from 'src/app/models/space';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css']
})
export class UserSpaceComponent {
  spaceId = '';
  space?: Space;

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private router: Router,
    private apiService: ApiService, 
    public dataService: DataService,
    public dialog: MatDialog) {}

  ngOnInit() {
    // Get space ID from path
    this.spaceId = this.route.snapshot.paramMap.get('space_id') ?? '';

    // Clear the expenses array from dataService
    this.dataService.expenses.splice(0);

    // Get new expenses from API
    this.apiService.getExpensesFromSpaceId(this.spaceId)
      .subscribe(expenses => this.dataService.expenses = expenses);

    // Get category from API
    this.apiService.getCategoriesFromSpace(this.spaceId)
      .subscribe(categories => this.dataService.categories = categories);

    // Get space from its ID
    this.space = this.dataService.findSpaceById(this.spaceId);
  }

  onExpense(expenseId: string) {
    this.router.navigate([`space/${this.spaceId}/expense/${expenseId}`]);
  }

  openCreateExpenseDialog() {
    const dialogRef = this.dialog.open(CreateExpenseDialogComponent, 
      { data: { spaceId: this.spaceId } });

    // Get expense from dialog
    dialogRef.afterClosed().subscribe(expense => {
      if (expense) {
        this.dataService.expenses.push(expense);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
