import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { CreateSpaceDialogComponent } from '../dialogs/create-space-dialog/create-space-dialog.component';
import { Space } from 'src/app/models/space';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent {
  constructor(
    private router: Router, 
    private apiService: ApiService, 
    public dataService: DataService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.apiService.getSpaces().subscribe(spaces => this.dataService.spaces = spaces);
  }

  onSpace(spaceId: string) {
    this.router.navigate([`space/${spaceId}`]);
  }

  onEdit(event: MouseEvent, spaceId: string) {
    event.stopPropagation();
    this.router.navigate([`space/${spaceId}/edit`]);
  }

  onDelete(event: MouseEvent, spaceId: string) {
    event.stopPropagation();
    this.apiService.deleteSpace(spaceId).subscribe(_ => {
      this.dataService.removeSpaceById(spaceId);
    });
  }

  openCreateSpaceDialog() {
    const dialogRef = this.dialog.open(CreateSpaceDialogComponent);

    // Add space to the spaces if created
    dialogRef.afterClosed().subscribe(space => {
      if (space) {
        this.dataService.spaces.push(space);
      }
    });
  }
}
