import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = { 
    user_username: '',
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_password: '',
  };

  constructor(private router: Router, private apiService: ApiService) {};

  onCreate(event: any) {
    console.log(this.user);
    this.apiService.createUser(this.user);
  }

  goToLogin(event: any) {
    this.router.navigate(['login']);
  }
}
