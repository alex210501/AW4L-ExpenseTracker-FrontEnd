import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})

/**
 * Dialog that show an error
 */
export class ErrorDialogComponent {
  /**
   * Constructor
   * @param dialogRef Reference to a dialog
   * @param data Message to display in the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message
  ) {}

  /**
   * Open a new dialog
   * @param dialog Dialog to open
   * @param error Error to display
   */
  static openDialog(dialog: MatDialog, error: Object) {
    dialog.open(ErrorDialogComponent, {
      data: error as Message,
      width: '250px',
    });
  }
}
