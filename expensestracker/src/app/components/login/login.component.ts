import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { Credentials } from 'src/app/models/credentials';
import { ErrorDialogComponent } from 'src/app/components/dialogs/error-dialog/error-dialog.component';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = new Credentials;

  constructor(private router: Router, private apiService: ApiService, public dialog: MatDialog){}

  onLogin(event: any) {
    this.apiService.login(this.credentials, 
        (err) => ErrorDialogComponent.openDialog(this.dialog, err.error))
        .subscribe(_ => this.router.navigate(['spaces']));
  }

  goToSignUp(event: any) {
    this.router.navigate(['signup']);
  }
}
