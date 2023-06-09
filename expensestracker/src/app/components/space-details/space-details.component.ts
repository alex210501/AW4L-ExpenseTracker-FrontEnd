import { Component, createPlatform } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { Space } from 'src/app/models/space';

@Component({
  selector: 'app-space-details',
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.css'],
})

/**
 * Screen to display the details of a space
 */
export class SpaceDetailsComponent {
  space?: Space;
  memberToAdd = '';
  categoryToAdd = '';

  /**
   * Constructor
   * @param route Used to get the parameters passed to the route
   * @param location Used to access the location history
   * @param router Allow to change the route
   * @param apiService Service to access the API
   * @param dataService Service to access the dhared variables
   * @param dialog Dialog to open
   */
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private apiService: ApiService,
    public dataService: DataService,
    public dialog: MatDialog
  ) {}

  /**
   * Initialize component
   */
  ngOnInit() {
    // Get space ID from path
    const spaceId = this.route.snapshot.paramMap.get('space_id') ?? '';

    // Get space from its space ID and category
    this.space = this.dataService.findSpaceById(spaceId);

    // Get category from API
    if (this.space) {
      this.apiService
        .getCategoriesFromSpace(this.space.space_id)
        .subscribe((categories) => (this.dataService.categories = categories));
    }
  }

  /**
   * Callback used when want to save the space informations
   */
  onSave() {
    if (this.space) {
      this.apiService
        .patchSpace(this.space, (err) =>
          ErrorDialogComponent.openDialog(this.dialog, err.error)
        )
        .subscribe();
    }
  }

  /**
   * Callback used when want to delete the space
   */
  onDelete() {
    if (this.space) {
      this.apiService
        .deleteSpace(this.space.space_id, (err) =>
          ErrorDialogComponent.openDialog(this.dialog, err.error)
        )
        .subscribe((_) => this.router.navigate([`spaces`]));
    }
  }

  /**
   * Callback to add a user to the space
   */
  addUserToSpace() {
    if (this.space) {
      this.apiService
        .addUserToSpace(this.space.space_id, this.memberToAdd, (err) =>
          ErrorDialogComponent.openDialog(this.dialog, err.error)
        )
        .subscribe((collaborator) => {
          // Return if no user has been defined
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

  /**
   * Delete a user from the space
   * @param username Username of the user to delete
   */
  deleteUserFromSpace(username: string) {
    if (this.space) {
      this.apiService
        .deleteUserFromSpace(this.space.space_id, username, (err) =>
          ErrorDialogComponent.openDialog(this.dialog, err.error)
        )
        .subscribe((_) => {
          this.space!.space_collaborators =
            this.space!.space_collaborators.filter((elem) => elem != username);
        });
    }

    this.router.navigate([`spaces`]);
  }

  /**
   * Add a new category to the space
   */
  addCategoryToSpace() {
    if (this.space) {
      this.apiService
        .createCategoryToSpace(this.space.space_id, this.categoryToAdd)
        .subscribe((category) => {
          this.dataService.categories.push(category);
        });
    }
  }

  /**
   * Delete a category from the space
   * @param categoryId ID of the category to delete
   */
  deleteCategoryFromSpace(categoryId: string) {
    if (this.space) {
      this.apiService
        .deleteCategoryFromSpace(this.space.space_id, categoryId)
        .subscribe((_) => {
          this.dataService.categories = this.dataService.categories.filter(
            (category) => category.category_id != categoryId
          );
        });
    }
  }

  /**
   * Go back to the previous screen
   */
  goBack() {
    this.location.back();
  }
}
