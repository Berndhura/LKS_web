import { user, seller } from './../assets/dummyDaten/dummy-user';
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

  currentUser: User = user;
  currentSeller: Seller = seller;

  constructor(public authService: AuthServiceMail) {

  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.isAuth = false;
    this.authService.logout();
  }
}
