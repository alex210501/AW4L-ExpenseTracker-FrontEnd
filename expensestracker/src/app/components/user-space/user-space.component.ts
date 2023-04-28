import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css']
})
export class UserSpaceComponent {
  spaceId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.spaceId = this.route.snapshot.paramMap.get('space_id') ?? '';

    console.log('here');
    console.log(this.spaceId);
  }
}
