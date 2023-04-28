import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { Space } from 'src/app/models/space';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent {
  spaces: Space[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getSpaces().subscribe(spaces => this.spaces = spaces);
  }

  onSpace(spaceId: string) {
    this.router.navigate([`space/${spaceId}`]);
  }
}
