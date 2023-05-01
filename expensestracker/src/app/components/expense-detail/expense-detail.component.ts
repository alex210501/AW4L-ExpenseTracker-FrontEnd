import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent {
  spaceId = '';
  expense?: Expense;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public dataService: DataService
  ) {}

  ngOnInit() {
    // Get space and expense ID from path
    this.spaceId = this.route.snapshot.paramMap.get('space_id') ?? '';
    const expenseId = this.route.snapshot.paramMap.get('expense_id') ?? '';

    // Get expense
    this.expense = this.dataService.findExpenseById(expenseId);
  }

  onEdit() {
    this.editMode = !this.editMode;
  }

  onDelete() {
    if (this.expense) {
      this.apiService.deleteExpense(this.spaceId, this.expense.expense_id)
        .subscribe(_ => this.router.navigate([`space/${this.spaceId}`]));
    }
  }

  onSave() {
    // if (this.expense) {
    //   console.log('yop');
    //   this.apiService.createExpense(
    //     this.spaceId, 
    //     this.expense.expense_description, 
    //     this.expense.expense_cost)
    //     .subscribe(_ => this.router.navigate([`space/${this.spaceId}`]));
    // } else {
    if (this.expense) {
      this.editMode = false;
      this.apiService.patchExpense(this.spaceId, this.expense!).subscribe();
    }
  }

  onCancel() {
    this.editMode = false;
  }
}
