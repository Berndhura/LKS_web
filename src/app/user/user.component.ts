import { AlertService } from './../services/alert.service';
import { firebaseImageUrl, staticImages } from './../configs/config';
import { LocationService } from './../services/location.service';
import { SelectionService } from './../services/selection.service';
import { Category } from './../types/category.model';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { ArticleService } from './../services/article.service';
import { Article, LocationData } from './../types/article.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  step: number;
  bookmarkedArticles: Article[];
  ownerArticles: Article[];

  firebaseImageUrl: string = firebaseImageUrl;
  placeholderPortrait: string = staticImages.placeholderPortrait;
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
    private alertService: AlertService,
    public authService: AuthServiceMail,
    private selectionService: SelectionService,
    private locationService: LocationService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.articleService.getBookmarkedArticles().subscribe(bookmarkedArticles => {
      this.bookmarkedArticles = bookmarkedArticles;

      this.articleService.getOwnerArticles().subscribe(ownerArticles => {
        this.ownerArticles = ownerArticles;
        this.setInitStep();
      });
    });

    this.seller = this.authService.seller;
  }

  setInitStep() {
    if (this.ownerArticles.length > 0) {
      this.step = 2;
    } else if (this.bookmarkedArticles.length > 0) {
      this.step = 1;
    } else {
      this.step = 0;
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  onProfileChange() {
    this.authService.seller = this.seller;
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
    this.seller.category = category.id;
    this.seller.categoryInfo = category;
    this.seller.categoryId = category.id;
    this.authService.seller = this.seller;
  }

  saveSeller() {
    this.authService.loadingUpdateSeller = true;
    this.authService.updateSeller(this.imgFile);
  }

  deleteUser() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      height: '200px',
      data: {text: 'Dein Nutzer und alle Anzeigen werden hiermit gelöscht.', action: 'Löschen'}
    });

    dialogRef.afterClosed().subscribe(resetCall => {
      if (resetCall) {
        this.authService.deleteUser();
      }
    });
  }
}
