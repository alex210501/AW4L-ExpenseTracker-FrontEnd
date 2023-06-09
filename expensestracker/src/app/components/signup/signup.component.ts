import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

/**
 * Screen where the user can sign up
 */
export class SignupComponent {
  signUpForm!: FormGroup;
  user: User = {
    user_username: '',
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_password: '',
  };
  confirmPassword = '';

  /**
   * Constructor
   * @param fb Form builder
   * @param router Router to change the location
   * @param apiService Service to access the API
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  /**
   * Private function to validate the password
   * @param control Control to access the Form variables
   * @returns null
   */
  _checkRetypePassword(control: AbstractControl) {
    let password: string = control.get('password')?.value;
    let confirmPassword: string = control.get('retype_password')?.value;

    if (password === confirmPassword) {
      return null;
    }

    // If password are different, trigger an error
    control.get('confirmPassword')?.setErrors({ mismatch: true });
    return null;
  }

  /**
   * Initialize component
   */
  ngOnInit(): void {
    // Create the Sign Up form
    this.signUpForm = this.fb.group(
      {
        username: new FormControl(this.user.user_username, [
          Validators.required,
        ]),
        firstname: new FormControl(this.user.user_firstname, [
          Validators.required,
        ]),
        lastname: new FormControl(this.user.user_lastname, [
          Validators.required,
        ]),
        email: new FormControl(this.user.user_email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(this.user.user_password, [
          Validators.required,
        ]),
        confirmPassword: new FormControl(this.confirmPassword, [
          Validators.required,
        ]),
      },
      { validator: this._checkRetypePassword }
    );
  }

  /**
   * Callback used when the user want to sign up
   */
  onCreate() {
    if (this.signUpForm.valid) {
      this.user.user_username = this.signUpForm.get('username')!.value;
      this.user.user_firstname = this.signUpForm.get('firstname')!.value;
      this.user.user_lastname = this.signUpForm.get('lastname')!.value;
      this.user.user_email = this.signUpForm.get('email')!.value;
      this.user.user_password = this.signUpForm.get('password')!.value;

      this.apiService
        .createUser(this.user, (err) => console.log(err))
        .subscribe();
      this.router.navigate(['login']);
    }
  }

  /**
   * Callback used when the user wants to loggin
   */
  goToLogin() {
    this.router.navigate(['login']);
  }
}
