import { AlertService } from './../services/alert.service';
import { AuthServiceMail } from './../services/auth.service';
import { firebaseImageUrl, staticImages } from './../configs/config';
import { Seller } from './../types/user.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentSeller: Seller;
  firebaseImageUrl: string = firebaseImageUrl;
  portraitPlaceholder: string = staticImages.placeholderPortrait;

  constructor(
    public authService: AuthServiceMail,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  openCreateArticle() {
    if (!this.currentSeller.name) {
      this.router.navigate(['user']);
      this.alertService.openAlert('Bitte trag noch ein paar Informationen über dich hier ein');
    } else {
      this.router.navigate(['create']);
    }
  }

  logout() {
    this.authService.logout();
  }

}
