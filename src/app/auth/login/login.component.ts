import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceEmail } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authServiceEmail: AuthServiceEmail) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
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
