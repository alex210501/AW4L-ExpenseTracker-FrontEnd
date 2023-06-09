import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-show-qrcode-dialog',
  templateUrl: './show-qrcode-dialog.component.html',
  styleUrls: ['./show-qrcode-dialog.component.css'],
})

/**
 * Dialog that shows the QR code of a space
 */
export class ShowQrcodeDialogComponent {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

  /**
   * Constructor
   * @param dialogRef Reference to the dialog
   * @param qrCodeData Data that represents the QR code
   */
  constructor(
    public dialogRef: MatDialogRef<ShowQrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public qrCodeData: string
  ) {}

  /**
   * Open a dialog
   * @param dialog Dialog to open
   * @param qrCodeValue Data for the QR code
   */
  static openDialog(dialog: MatDialog, qrCodeValue: string) {
    dialog.open(ShowQrcodeDialogComponent, { data: qrCodeValue });
  }
}
