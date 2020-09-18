import { AlertService } from './../services/alert.service';
import { staticImages } from './../configs/data-config';
import { LocationService } from './../services/location.service';
import { SelectionService } from './../services/selection.service';
import { Category } from './../types/category.model';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { ArticleService } from './../services/article.service';
import { Article, LocationData, ArticleObject } from './../types/article.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { Subscription } from 'rxjs';
import { loadingTimer } from './../configs/data-config';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  step: number;
  articles: Article[];
  articlesSubscription: Subscription;
  count: number;
  sites: number;
  currentSite: number;
  firstLoading = 'init';
  firstLoadingTimer: any;
  firstOpen = true;

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
    public selectionService: SelectionService,
    private locationService: LocationService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initSellerForm();
    this.firstLoadingTimer = setTimeout(() => {
      this.firstLoading = 'loading';
    }, loadingTimer);
    this.articleService.getBookmarkedArticles().subscribe(bookmarkedArticlesObject => {
      if (bookmarkedArticlesObject.articles.length > 0) {
        this.setArticleObject(bookmarkedArticlesObject);
        this.setInitStep(1);
      } else {
        this.articleService.getOwnerArticles().subscribe(ownerArticlesObject => {
          if (ownerArticlesObject.articles.length > 0) {
            this.setArticleObject(ownerArticlesObject);
            this.setInitStep(2);
          } else {
            this.setInitStep();
          }
        });
      }
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

  setInitStep(step?: number) {
    this.selectionService.currentSiteUserArticleList = 1;
    if (!this.seller.name || !this.seller.profilePicture) {
      this.step = 0;
    } else if (this.articles.length > 0) {
      this.step = step;
    }  else {
      this.step = 0;
    }
    clearTimeout(this.firstLoadingTimer);
    this.firstLoading = 'done';
  }

  setArticleObject(articleObject: ArticleObject) {
    this.articles = articleObject.articles;
    this.count = articleObject.count;
    this.sites = articleObject.sites;
    this.selectionService.setLoading(false);
  }

  setStep(index: number) {
    this.selectionService.currentSiteUserArticleList = 1;
    if (!this.firstOpen && (index === 1 || index === 2)) {
      this.getArticles(index);
      this.articles = [];
      this.selectionService.setLoading(true);
    }
    if (this.firstOpen) {
      this.firstOpen = false;
    }
    this.step = index;
  }

  getArticles(index: number) {
    if (this.articlesSubscription) {
      this.articlesSubscription.unsubscribe();
    }
    if (index === 1) {
      this.articlesSubscription = this.articleService.getBookmarkedArticles().subscribe(articleObject => {
        this.setArticleObject(articleObject);
      });
    }

    if (index === 2) {
      this.articlesSubscription = this.articleService.getOwnerArticles().subscribe(articleObject => {
        this.setArticleObject(articleObject);
      });
    }
  }

  pageChange(currentSite: number) {
    this.selectionService.currentSiteUserArticleList = currentSite;
    this.getArticles(this.step);
    this.selectionService.pageChangeSubject.next(true);
  }

  handleFileInput(files) {
    this.errorPictureMessage = null;
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
    if (category) {
      this.sellerForm.controls.category.setValue(category.id);
      this.seller.categoryInfo = category;
    } else {
      this.sellerForm.controls.category.setValue(null);
      this.seller.categoryInfo = null;
    }
  }

  saveSeller() {
    this.loadingUpdateSeller = true;
    this.authService.updateSeller(this.imgFile, this.sellerForm.value).then(result => {
      this.loadingUpdateSeller = false;
      if (result !== 'error') {
        this.alertService.openAlert('Nutzer erfolgreich aktualisiert', 'success');
        this.imgFile = null;
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

  deleteBookmark(articleId: string) {
    const index = this.articles.findIndex(article => article.id === articleId);
    this.articles.splice(index, 1);
    this.count = this.count - 1;
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
