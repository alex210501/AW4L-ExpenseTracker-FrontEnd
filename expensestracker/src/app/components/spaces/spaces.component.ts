import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { CreateSpaceDialogComponent } from '../dialogs/create-space-dialog/create-space-dialog.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css'],
})

/**
 * Screen that displays the spaces
 */
export class SpacesComponent {
  /**
   * Constructor
   * @param router Used to change the route
   * @param apiService Service to access the API
   * @param dataService Service to access the shared data
   * @param dialog Dialog to open
   */
  constructor(
    private router: Router,
    private apiService: ApiService,
    public dataService: DataService,
    public dialog: MatDialog
  ) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    this.apiService
      .getSpaces()
      .subscribe((spaces) => (this.dataService.spaces = spaces));
  }

  /**
   * Callback when the user want to logout
   */
  onLogout() {
    this.apiService.logout().subscribe(() => this.router.navigate(['login']));
  }

  /**
   * Callback when the user want to check the expenses of a space
   * @param spaceId ID of the space
   */
  onSpace(spaceId: string) {
    this.router.navigate([`space/${spaceId}`]);
  }

  /**
   * Edit a space
   * @param event Event that happened
   * @param spaceId ID of the space to edit
   */
  onEdit(event: MouseEvent, spaceId: string) {
    event.stopPropagation();
    this.router.navigate([`space/${spaceId}/edit`]);
  }

  /**
   * Delete a space
   * @param event Event that happened
   * @param spaceId ID of the space
   */
  onDelete(event: MouseEvent, spaceId: string) {
    event.stopPropagation();
    this.apiService.deleteSpace(spaceId).subscribe((_) => {
      this.dataService.removeSpaceById(spaceId);
    });
  }

  /**
   * Open the dialog to create a new space
   */
  openCreateSpaceDialog() {
    const dialogRef = this.dialog.open(CreateSpaceDialogComponent);

    // Add space to the spaces if created
    dialogRef.afterClosed().subscribe((space) => {
      if (space) {
        this.dataService.spaces.push(space);
      }
    });
  }
}
