import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthServiceMail } from './services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { User, Seller } from './types/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthServiceMail) {}

  ngOnInit() {
    this.authService.checkLocalSessionToken();
  }
}
