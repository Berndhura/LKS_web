import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceMail } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private authServiceEmail: AuthServiceMail) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authServiceEmail.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  onSubmitFacebook() {
    this.authServiceEmail.loginFacebook();
  }

  onSubmitGoogle() {
    this.authServiceEmail.loginGoogle();
  }
}
