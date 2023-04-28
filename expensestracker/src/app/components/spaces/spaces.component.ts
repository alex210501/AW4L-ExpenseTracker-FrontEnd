import { Component } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { Space } from 'src/app/models/space';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent {
  spaces: Space[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getSpaces().subscribe(spaces => this.spaces = spaces);
  }

  onSpace() {
    console.log("Hello");
  }
}
