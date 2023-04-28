import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = { 
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  constructor(private router: Router) {};

  onCreate(event: any) {
    console.log(this.user);
  }

  goToLogin(event: any) {
    this.router.navigate(['login']);
  }
}
