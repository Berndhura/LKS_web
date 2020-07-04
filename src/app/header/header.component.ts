import { AuthServiceMail } from './../services/auth.service';
import { firebaseImageUrl } from './../configs/config';
import { Seller } from './../types/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentSeller: Seller;
  firebaseImageUrl: string = firebaseImageUrl;

  constructor(public authService: AuthServiceMail) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
