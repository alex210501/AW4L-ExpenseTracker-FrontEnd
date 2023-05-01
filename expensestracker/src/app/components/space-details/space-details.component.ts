import { Component, createPlatform } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
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

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private apiService: ApiService,
    public dataService: DataService) {}

  ngOnInit() {
    // Get space ID from path
    const spaceId = this.route.snapshot.paramMap.get('space_id') ?? '';
    console.log(spaceId);
    // Get space from its space ID
    this.space = this.dataService.findSpaceById(spaceId);
  }

  onSave() {
    this.apiService.patchSpace(this.space!);
  }

  addUserToSpace() {
    if (this.space && this.space.space_id != '') {
      this.apiService.addUserToSpace(this.space!.space_id, this.memberToAdd)
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
    if (this.space && this.space.space_id != '') {
      this.apiService.deleteUserFromSpace(this.space!.space_id, username)
        .subscribe(_ => {
          this.space!.space_collaborators = this.space!.space_collaborators.filter(elem => elem != username);
        });
    }
  }
}
