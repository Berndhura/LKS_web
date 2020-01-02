import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceEmail } from '../auth.service';
import { AuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'ng4-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authServiceEmail: AuthServiceEmail,
    private socialAuthService: AuthService) {}

  public user: any = SocialUser;

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authServiceEmail.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then( userData => {
      this.user = userData;
    });
  }

  googleLogin() {
    console.log('GOOGLE anmeldung')
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then( userData => {
      this.user = userData;
      console.log(this.user);
    });
  }

}
