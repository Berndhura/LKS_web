import { firebaseImageUrl } from './../configs/config';
import { LocationService } from './../services/location.service';
import { SelectionService } from './../services/selection.service';
import { Category } from './../types/category.model';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { ArticleService } from './../services/article.service';
import { Article, LocationData } from './../types/article.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  step = 0;
  bookmarkedArticles: Article[];
  ownerArticles: Article[];

  firebaseImageUrl: string = firebaseImageUrl;
  imgURL: any;
  imgFile: File;
  errorPictureMessage: string;

  seller: Seller;

  sellerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private articleService: ArticleService,
    private authServiceMail: AuthServiceMail,
    private selectionService: SelectionService,
    private locationService: LocationService,
    private ref: ChangeDetectorRef) { }

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

  handleFileInput(files) {
    this.errorPictureMessage = null;
    // this.uploadService.uploadImage(file);
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.errorPictureMessage = 'Bitte wähle ein Bild aus';
        return;
      }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
        this.imgURL = reader.result;
      };
    this.imgFile = files[0];
  }

  categoryChange(category: Category) {
    this.seller.category = category;
    this.seller.categoryId = category.id;
    this.authServiceMail.seller = this.seller;
  }

  getLocation() {
    const self = this;
    this.locationService.getLocationByIp((location: LocationData) => {
      this.seller.homespot = location;
      self.ref.detectChanges();
    });
  }

  saveSeller() {
    console.log(this.sellerForm);
    this.authServiceMail.updateSeller(this.imgFile);
  }
}
