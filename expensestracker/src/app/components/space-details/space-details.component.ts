import { Component, createPlatform } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { Space } from 'src/app/models/space';
import { SpacesComponent } from '../spaces/spaces.component';

@Component({
  selector: 'app-space-details',
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.css']
})
export class SpaceDetailsComponent {
  space?: Space;
  memberToAdd = '';
  categoryToAdd = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private apiService: ApiService,
    public dataService: DataService,
    public dialog: MatDialog ) {}

  ngOnInit() {
    // Get space ID from path
    const spaceId = this.route.snapshot.paramMap.get('space_id') ?? '';
    
    // Get space from its space ID and category
    this.space = this.dataService.findSpaceById(spaceId);

    // Get category from API
    if (this.space) {
      this.apiService.getCategoriesFromSpace(this.space.space_id)
        .subscribe(categories => this.dataService.categories = categories);
    }
  }

  onSave() {
    if (this.space) {
      this.apiService.patchSpace(this.space, (err) => ErrorDialogComponent.openDialog(this.dialog, err.error))
        .subscribe();
    }
  }

  onDelete() {
    if (this.space) {
      this.apiService.deleteSpace(this.space.space_id, (err) => ErrorDialogComponent.openDialog(this.dialog, err.error))
        .subscribe(_ => this.router.navigate([`spaces`]));
    }
  }

  addUserToSpace() {
    if (this.space) {
      this.apiService.addUserToSpace(this.space.space_id, this.memberToAdd, (err) => ErrorDialogComponent.openDialog(this.dialog, err.error))
        .subscribe(collaborator => {
          if (collaborator === undefined) {
            return;
          }

          const collaboratorUser = collaborator.collaborator_user;

          if (collaboratorUser) {
            this.space!.space_collaborators.push(collaboratorUser);
          }

          this.memberToAdd = '';
        });
    }
  }

  deleteUserFromSpace(username: string) {
    if (this.space) {
      this.apiService.deleteUserFromSpace(this.space.space_id, username, (err) => ErrorDialogComponent.openDialog(this.dialog, err.error))
        .subscribe(_ => {
          this.space!.space_collaborators = this.space!.space_collaborators.filter(elem => elem != username);
        });
    }

    this.router.navigate([`spaces`]);
  }

  addCategoryToSpace() {
    if (this.space) {
      this.apiService.createCategoryToSpace(this.space.space_id, this.categoryToAdd)
        .subscribe(category => {
          this.dataService.categories.push(category);
        })
    }
  }

  deleteCategoryFromSpace(categoryId: string) {
    if (this.space) {
      this.apiService.deleteCategoryFromSpace(this.space.space_id, categoryId)
        .subscribe(_ => {
          this.dataService.categories = this.dataService
            .categories.filter(category => category.category_id != categoryId);
        })
    }
  }

  goBack() {
    this.location.back();
  }
}
