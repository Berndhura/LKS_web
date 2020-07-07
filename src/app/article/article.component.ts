import { Observable } from 'rxjs';
import { LocationData } from './../types/article.model';
import { AuthServiceMail } from './../services/auth.service';
import { SelectionService } from './../services/selection.service';
import { Category, Subcategory } from './../types/category.model';
import { categories, subcategories } from './../configs/data-config';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Article } from '../types/article.model';
import { Seller, User } from '../types/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { pictureUrl } from '../configs/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {firebaseImageUrl} from '../configs/config';


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
    private router: Router
    ) { }

  ngOnInit() {
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
        this.currentPictureUrl = this.getPictureUrl(article.pictureIds[0]);
        this.currentPictureId = article.pictureIds[0];
      }
      );
    });
  }



  onSubmit() {
    this.articleService.sendMessage(this.article.sellerMail, this.mailForm.value.sender, this.mailForm.value.message);
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

  getPictureUrl(pictureId: string): string {
    return pictureUrl + pictureId;
  }

 

  changeCurrentPicture(index: number) {
    this.currentPictureUrl = this.getPictureUrl(this.article.pictureIds[index]);
    this.currentPictureId = this.article.pictureIds[index];
  }

  // onBookmark() {
  //   this.articleService.bookmarkArticle(this.article.id, "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkMjM0OTg4ZTNhYWU2N2FmYmMwMmNiMWM0MTQwYjNjZjk2ODJjYWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjI1Njg0OTI4MjQ1LXQ3aGU2aHVxM2hiczlmdGQ0NWFyZDVwY2E0NmplZ3NmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjI1Njg0OTI4MjQ1LXQ3aGU2aHVxM2hiczlmdGQ0NWFyZDVwY2E0NmplZ3NmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA5MTU2NzcwNTc1NzgxNjIwNzY3IiwiZW1haWwiOiJzbmFja2Vyc2F1QGZyZWVuZXQuZGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9mT0FOWGNOUzlSUGdfdnFNWWNhSmciLCJpYXQiOjE1NzgzMzE1MzEsImV4cCI6MTU3ODMzNTEzMX0.o_LbEb6LqpTqFYRYL7I6EZkMIiiJicXxFKijOecEbtxiVPtFMiFxn4VooayeIAdGB3zMXMpSfeEdxv6p2G9pbPZB9htFLE7c9sn_C-oIIsSnukgNoOImcsPxOQtHYRKO-qOtpB3I25gjPfBzgGbqcc9lqkaoZow2Bo24r63FSHyT0RSnmz-hSn9ZHQ12gWE9AKf4jNjvmVoUBCnr2c8Cu0zjf7Flo8U6mVHecfN_GX4awC4g46IDXcbsk4sl4jVswLJefrq5kyQ5958fhvLMdlwiJfxrm6c7rOo62jA6--8imZAa8WI9L9W1Jdyou__Dry1s23DmDSfrpMcAoHslbw").subscribe(result => {
  //     console.log(result);
  //   });
  // }

  addBookmark(articleId: number) {
    this.articleService.addBookmarkArticle(articleId);
  }

  deleteBookmark(articleId: number) {
    this.articleService.deleteBookmarkArticle(articleId);
  }
}
