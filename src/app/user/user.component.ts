import { UploadService } from './../services/upload.service';
import { Category } from './../types/category.model';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { ArticleService } from './../services/article.service';
import { Article } from './../types/article.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';

declare var require: any;
const ipLocation = require('../../../node_modules/iplocation');



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  step = 0;
  bookmarkedArticles: Article[];
  ownerArticles: Article[];

  seller: Seller;

  sellerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private articleService: ArticleService,
    private authServiceMail: AuthServiceMail,
    private httpClient: HttpClient,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.articleService.getBookmarkedArticles().subscribe(articles => {
      this.bookmarkedArticles = articles;
    });

    this.articleService.getOwnerArticles().subscribe(articles => {
      this.ownerArticles = articles;
    });

    this.seller = this.authServiceMail.seller;
  }

  setStep(index: number) {
    this.step = index;
  }

  onProfileChange() {
    this.authServiceMail.seller = this.seller;
  }

  handleFileInput(file) {
    console.log(file);
    this.uploadService.uploadImage(file);
  }

  categoryChange(category: Category) {
    this.seller.category = category;
    this.seller.categoryId = category.id;
    this.authServiceMail.seller = this.seller;
  }

  getLocation() {
    this.httpClient.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      ipLocation(res.ip).then(location => {
        this.seller.homespot = location.city;
      });
    });

    // const geocoder = new google.maps.Geocoder();

    // navigator.geolocation.getCurrentPosition(position => {
    //   const latlng = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   };

    //   geocoder.geocode({location: latlng}, results => {
    //     console.log(results);
    //    });
    // });
  }

  saveSeller() {
    console.log(this.sellerForm);
    this.authServiceMail.updateSeller();
  }
}
