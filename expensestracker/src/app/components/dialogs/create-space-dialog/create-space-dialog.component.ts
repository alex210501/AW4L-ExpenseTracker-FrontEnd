import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Space } from 'src/app/models/space';

@Component({
  selector: 'app-create-space-dialog',
  templateUrl: './create-space-dialog.component.html',
  styleUrls: ['./create-space-dialog.component.css'],
})

/**
 * Dialog to create or join a space
 */
export class CreateSpaceDialogComponent {
  spaceName = '';
  spaceDescription = '';
  spaceId = '';

  /**
   * Constructor
   * @param dialogRef Reference to a dialog
   * @param dialog Dialog
   * @param apiService Service to use the API
   * @param dataService Service to access the shared data
   */
  constructor(
    public dialogRef: MatDialogRef<CreateSpaceDialogComponent>,
    public dialog: MatDialog,
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  /**
   * Callback used to create a new space
   */
  onCreate() {
    this.apiService
      .createSpace(this.spaceName, this.spaceDescription, (err) =>
        ErrorDialogComponent.openDialog(this.dialog, err.error)
      )
      .subscribe((result) => this.dialogRef.close(result as Space));
  }

  /**
   * Callback used to join a new space
   */
  onJoin() {
    this.apiService
      .joinSpace(this.spaceId, (err) =>
        ErrorDialogComponent.openDialog(this.dialog, err.error)
      )
      .subscribe((_) => {
        this.apiService
          .getSpaceById(this.spaceId, (err) =>
            ErrorDialogComponent.openDialog(this.dialog, err.error)
          )
          .subscribe((space) => {
            this.dataService.spaces.push(space);
            this.dialogRef.close();
          });
      });
  }

  /**
   * Cancel the space creation
   */
  onCancel() {
    this.dialogRef.close();
  }
}
