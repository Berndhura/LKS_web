import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceMail } from './services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { User, Seller } from './types/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  isAuth = false;
  authSubscription: Subscription;

  constructor(public authService: AuthServiceMail) {

  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });

    this.authService.checkLocalSessionToken();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.isAuth = false;
    this.authService.logout();
  }
}
