import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceEmail } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  isAuth = false;
  openSidenav = true;
  authSubscription: Subscription;
  photoURL: any;
  currentUser: any;

  constructor(private authService: AuthServiceEmail) {

  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
      if (localStorage.getItem('user')) {
        const data = localStorage.getItem('user');
        this.photoURL = JSON.parse(data)['user']['photoURL'];
        this.currentUser = JSON.parse(data)['user']['displayName']
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  toggleSideNav() {
    this.openSidenav = !this.openSidenav;
  }

  closeSideNav() {
    this.openSidenav = false;
  }

  logout() {
    this.isAuth = false;
    this.authService.logout();
  }
}
