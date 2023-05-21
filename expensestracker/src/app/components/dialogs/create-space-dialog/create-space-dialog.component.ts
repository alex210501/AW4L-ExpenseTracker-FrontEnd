import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { Space } from 'src/app/models/space';

@Component({
  selector: 'app-create-space-dialog',
  templateUrl: './create-space-dialog.component.html',
  styleUrls: ['./create-space-dialog.component.css']
})
export class CreateSpaceDialogComponent {
  spaceName = '';
  spaceDescription = '';
  spaceId = '';

  constructor(
    public dialogRef: MatDialogRef<CreateSpaceDialogComponent>,
    private apiService: ApiService,
    ) {}

    onCreate() {
      this.apiService.createSpace(this.spaceName, this.spaceDescription)
        .subscribe(result => this.dialogRef.close(result as Space));
    }

    onCancel() {
      this.dialogRef.close();
    }
}
