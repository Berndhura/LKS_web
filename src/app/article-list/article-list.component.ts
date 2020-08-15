import { placeholderImage } from './../configs/data-config';
import { ArticleService } from './../services/article.service';
import { User, Seller } from './../types/user.model';
import { AuthServiceMail } from './../services/auth.service';
import { Article, LocationData } from './../types/article.model';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../types/category.model';
import { categories, subcategories } from '../configs/data-config';
import { pictureUrl } from '../configs/config';
import { SelectionService } from '../services/selection.service';
import { Router } from '@angular/router';
import {firebaseImageUrl} from './../configs/config';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @Input() filteredArticles: Article[];
  @Input() user: User;
  @Input() seller: Seller;

  placeholderImage = placeholderImage;

  firebaseImageUrl = firebaseImageUrl;

  constructor(
    private selectionService: SelectionService,
    public authServiceMail: AuthServiceMail,
    private articleService: ArticleService,
    private alertService: AlertService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  getPictureUrl(pictureId: string): string {
    return pictureUrl + pictureId;
  }

  getProduct(category: string): Category {
    const selectedProduct = categories.find(c => c.id === category);
    return selectedProduct;
  }

  getSubCat(category: string, subcategory: string): any {
    const selectedSubcategory = subcategories.find(s => (s.category === category && s.id === subcategory));
    // if (!selectedSubcategory) {
    //   return '../../assets/images/questionmark.jpg';
    // }
    // return '../../assets/images/questionmark.jpg';
    return selectedSubcategory;
  }

  getPrice(article: Article): string {
    return this.selectionService.getPrice(article);
  }

  getLocation(locations: string[]): string {
    if (locations) {
      if (locations.length > 1) {
        return locations[0] + ',...';
      } else {
        return locations[0];
      }
    }
  }

  // getLocationTooltip(locations: LocationData[]): string {
  //   let location = '';
  //   locations.forEach(l => {
  //     location = location + l.name + ', ';
  //   });
  //   return location;
  // }

  addBookmark(articleId: number) {
    this.articleService.addBookmarkArticle(articleId);
  }

  deleteBookmark(articleId: number) {
    this.articleService.deleteBookmarkArticle(articleId);
  }
}
