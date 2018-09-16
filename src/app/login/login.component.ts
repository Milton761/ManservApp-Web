import { Component, OnInit } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {FormControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
console.log('Hello1');

declare var require: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  afAuth: AngularFireAuth;
  email = new FormControl('');
  pass = new FormControl('');

  private googleICON = require('src/assets/google-icon.jpg');

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    console.log('asdasdasdsa');
    this.authService.loginEmailPass(this.email.value, this.pass.value)
    .then(ref => {
      if (ref.user.emailVerified) {
        this.router.navigate(['/screen']);
      }
    });
  }

  signInGoogle() {
    this.authService.loginGoogle();
  }

  logOut() {
    this.authService.logout();
  }

  signUp() {

    if (this.email.valid && this.pass.valid) {
      this.authService.signUp(this.email.value, this.pass.value);
    }
  }

  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }


  getErrorMessagePass() {
    return 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
  }

}
