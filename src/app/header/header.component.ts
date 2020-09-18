import { AlertService } from './../services/alert.service';
import { AuthServiceMail } from './../services/auth.service';
import { staticImages } from './../configs/data-config';
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
  portraitPlaceholder: string = staticImages.placeholderPortrait;
  iconLuftkraftsport: string = staticImages.iconLuftkraftsport;

  constructor(
    public authService: AuthServiceMail,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  openCreateArticle() {
    if (!this.currentSeller.name) {
      this.router.navigate(['user']);
      this.alertService.openAlert('Bitte trag noch ein paar Informationen über dich hier ein', 'warning');
    } else {
      this.router.navigate(['create']);
    }
  }

  logout() {
    this.authService.logout();
  }
}
