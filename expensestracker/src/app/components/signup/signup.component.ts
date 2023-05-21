import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors , ValidatorFn, Validators, } from '@angular/forms'
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  user: User = { 
    user_username: '',
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_password: '',
  };
  retype_password = '';

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {};

  _checkRetypePassword(control: AbstractControl) {
    let password: string = control.get('password')?.value;
    let confirmPassword: string = control.get('retype_password')?.value;

    if (password === confirmPassword) {
      return null
    }

    control.get("retype_password")?.setErrors({ mismatch: true });
    return null;
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: new FormControl(this.user.user_username, [Validators.required]),
      firstname: new FormControl(this.user.user_firstname, [Validators.required]),
      lastname: new FormControl(this.user.user_lastname, [Validators.required]),
      email: new FormControl(this.user.user_email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.user_password, [Validators.required]),
      retype_password: new FormControl(this.retype_password, [Validators.required]),
    }, { validator: this._checkRetypePassword});
  }

  onCreate() {
    if (this.signUpForm.valid) {
      this.user.user_username = this.signUpForm.get('username')!.value;
      this.user.user_firstname = this.signUpForm.get('firstname')!.value;
      this.user.user_lastname = this.signUpForm.get('lastname')!.value;
      this.user.user_email = this.signUpForm.get('email')!.value;
      this.user.user_password = this.signUpForm.get('password')!.value;

      this.apiService.createUser(this.user, (err) => console.log(err)).subscribe();
      this.router.navigate(['login']);
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
