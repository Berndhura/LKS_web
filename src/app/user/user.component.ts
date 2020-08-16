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
  loadingUpdateSeller = false;

  seller: Seller;
  sellerForm: FormGroup;


  constructor(
    private articleService: ArticleService,
    private alertService: AlertService,
    public authService: AuthServiceMail,
    private selectionService: SelectionService,
    private locationService: LocationService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initSellerForm();
    this.articleService.getBookmarkedArticles().subscribe(bookmarkedArticles => {
      this.bookmarkedArticles = bookmarkedArticles;

      this.articleService.getOwnerArticles().subscribe(ownerArticles => {
        this.ownerArticles = ownerArticles;
        this.setInitStep();
      });
    });
  }

  initSellerForm() {
    this.seller = JSON.parse(JSON.stringify(this.authService.seller));
    this.sellerForm = new FormGroup({
      name: new FormControl(this.seller.name, Validators.required),
      email: new FormControl({value: this.seller.email, disabled: true}, [Validators.required, Validators.email]),
      category: new FormControl(this.seller.category),
      phone: new FormControl(this.seller.phone),
      location: new FormControl(this.seller.location),
    });
  }

  setInitStep() {
    if (!this.seller.name || !this.seller.profilePicture) {
      this.step = 0;
    } else if (this.ownerArticles.length > 0) {
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
    this.sellerForm.controls.category.setValue(category.id);
    this.seller.categoryInfo = category;
  }

  saveSeller() {
    this.loadingUpdateSeller = true;
    this.authService.updateSeller(this.imgFile, this.sellerForm.value).then(result => {
      this.loadingUpdateSeller = false;
      if (result !== 'error') {
        this.alertService.openAlert('Nutzer erfolgreich aktualisiert!');
        this.mapSellerForm(this.sellerForm.value);
        this.initSellerForm();
      }
});
  }

  mapSellerForm(sellerFormValues) {
    const keys: string[] = Object.keys(sellerFormValues);
    const values: string[] = Object.values(sellerFormValues);

    keys.forEach((key, index) => {
      this.authService.seller[key] = values[index];
      if (key === 'category') {
        this.authService.seller.categoryInfo = this.selectionService.getCategory(values[index]);
      }
    });
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
