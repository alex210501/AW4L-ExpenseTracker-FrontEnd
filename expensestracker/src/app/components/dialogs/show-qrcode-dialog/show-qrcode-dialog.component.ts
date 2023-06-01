import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


@Component({
  selector: 'app-show-qrcode-dialog',
  templateUrl: './show-qrcode-dialog.component.html',
  styleUrls: ['./show-qrcode-dialog.component.css']
})
export class ShowQrcodeDialogComponent {
    elementType = NgxQrcodeElementTypes.URL;
    correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;

    constructor(
        public dialogRef: MatDialogRef<ShowQrcodeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public qrCodeData: string,
    ) {
        console.log('damn');
        console.log(qrCodeData);
    }

    static openDialog(dialog: MatDialog, qrCodeValue: string) {
        dialog.open(ShowQrcodeDialogComponent, { data: qrCodeValue });
    }
}
