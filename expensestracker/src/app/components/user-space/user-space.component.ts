import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Space } from 'src/app/models/space';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css']
})
export class UserSpaceComponent {
  spaceId = '';
  space?: Space;

  constructor(private route: ActivatedRoute, private apiService: ApiService, public dataService: DataService) {}

  ngOnInit() {
    // Get space ID from path
    this.spaceId = this.route.snapshot.paramMap.get('space_id') ?? '';

    // Clear the expenses array from dataService
    this.dataService.expenses.splice(0);

    // Get new expenses from API
    this.apiService.getExpensesFromSpaceId(this.spaceId)
      .subscribe(expenses => this.dataService.expenses = expenses);

    // Get space from its ID
    this.space = this.dataService.findSpaceById(this.spaceId);
  }

  onExpense(expenseId: string) {
    console.log(`Click expense ID: ${expenseId}`);
  }
}
