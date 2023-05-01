import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { Space } from 'src/app/models/space';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent {
  spaces: Space[] = [];

  constructor(private router: Router, private apiService: ApiService, public dataService: DataService) {}

  ngOnInit() {
    this.apiService.getSpaces().subscribe(spaces => this.dataService.spaces = spaces);
  }

  onSpace(spaceId: string) {
    this.router.navigate([`space/${spaceId}`]);
  }

  onEdit(spaceId: string) {
    this.router.navigate([`space/${spaceId}/edit`]);
  }
}
