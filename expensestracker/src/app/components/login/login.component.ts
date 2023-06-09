import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { Credentials } from 'src/app/models/credentials';
import { ErrorDialogComponent } from 'src/app/components/dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

/**
 * Login screen
 */
export class LoginComponent {
  credentials = new Credentials();

  /**
   *
   * @param router Router used to change the location
   * @param apiService Access to the API service
   * @param dialog Dialog to open
   */
  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}

  /**
   * Callback used when the user try to loggin
   */
  onLogin() {
    this.apiService
      .login(this.credentials, (err) =>
        ErrorDialogComponent.openDialog(this.dialog, err.error)
      )
      .subscribe((_) => this.router.navigate(['spaces']));
  }

  /**
   * Callback used when the user want to sign up
   */
  goToSignUp() {
    this.router.navigate(['signup']);
  }
}
