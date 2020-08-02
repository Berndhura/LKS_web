import { Observable } from 'rxjs';
import { LocationData } from './../types/article.model';
import { AuthServiceMail } from './../services/auth.service';
import { SelectionService } from './../services/selection.service';
import { Category, Subcategory } from './../types/category.model';
import { categories, subcategories, placeholderImage } from './../configs/data-config';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Article } from '../types/article.model';
import { Seller, User } from '../types/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {firebaseImageUrl} from '../configs/config';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article = null;
  article$: Observable<Article>;
  user: User;
  seller: Seller;
  currentPictureUrl: string;
  currentPictureId: string;

  firebaseImageUrl = firebaseImageUrl;
  placeholderImage = placeholderImage;


  category: Category;
  subcategory: Subcategory;

  mailForm = new FormGroup({
    message: new FormControl('', Validators.required),
    sender: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private route: ActivatedRoute,
    private authServiceMail: AuthServiceMail,
    private articleService: ArticleService,
    private selectionService: SelectionService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    if (this.authServiceMail.triggerLocalStorageLogin) {
      this.authServiceMail.getAuthStatus().subscribe(() => {
        this.initArticle();
      });
    } else {
      this.initArticle();
    }
  }

  initArticle() {
    this.seller = this.authServiceMail.seller;
    if (this.seller) {
      this.mailForm.setValue({
        message: '',
        sender: this.seller.email,
     });
    }
    this.user = this.authServiceMail.user;
    this.route.params.subscribe(params => {
      const key = params.key;
      this.articleService.getArticle(key).subscribe(article => {
        if (article === undefined) {
          this.router.navigateByUrl('404');
          return;
        }
        this.article = article;
        if (article.pictureUrls) {
          this.currentPictureUrl = article.pictureUrls[0];
        }
      }
      );
    });
  }



  onSubmit() {
    this.articleService.sendMessage(this.article.sellerEmail, this.mailForm.value.sender, this.mailForm.value.message);
  }

  getLocations(locations: LocationData[]): string {
      let location = '';
      locations.forEach((loc, index) => {
        if (index === locations.length - 1) {
          location = location + loc.name;
         } else {
          location = location + loc.name + ', ';
         }
      });
      return location;
  }

  getPrice(article: Article): string {
    return this.selectionService.getPrice(article);
  }

  changeCurrentPicture(pictureUrl: string) {
    this.currentPictureUrl = pictureUrl;
  }

  addBookmark(articleId: number) {
    this.articleService.addBookmarkArticle(articleId);
  }

  deleteBookmark(articleId: number) {
    this.articleService.deleteBookmarkArticle(articleId);
  }

  deleteArticle() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      height: '200px',
      data: {text: 'Dieser Artikel wird hiermit vollständig gelöscht.', action: 'Löschen'}
    });

    dialogRef.afterClosed().subscribe(resetCall => {
      if (resetCall) {
        this.articleService.deleteArticle(this.article.id);
      }
    });
  }
}
