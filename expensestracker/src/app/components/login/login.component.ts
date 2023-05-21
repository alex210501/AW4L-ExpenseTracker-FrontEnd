import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = new Credentials;

  constructor(private router: Router, private apiService: ApiService){}

  onLogin(event: any) {
    this.apiService.login(this.credentials, (_) => console.log('hey'))
        .subscribe(_ => this.router.navigate(['spaces']));
  }

  goToSignUp(event: any) {
    this.router.navigate(['signup']);
  }
}
