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

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @Input() filteredArticles: Article[];

  user: User;
  seller: Seller;

  constructor(
    private selectionService: SelectionService,
    private authServiceMail: AuthServiceMail,
    private articleService: ArticleService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.authServiceMail.user;
    this.seller = this.authServiceMail.seller;
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
    if (locations.length > 1) {
      return locations[0] + ',...';
    } else {
      return locations[0];
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
    this.articleService.addBookmarkArticle(articleId, this.seller.id);
  }

  deleteBookmark(articleId: number) {
    this.articleService.deleteBookmarkArticle(articleId, this.seller.id);
  }

  editArticle(article: Article) {
    this.selectionService.currentArticle = article;
    this.router.navigate(['/create']);
  }

}
