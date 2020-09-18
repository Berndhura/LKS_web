import { AuthServiceMail } from './../services/auth.service';
import { Subcategory, Category } from './../types/category.model';
import { SelectionService } from '../services/selection.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../types/article.model';
import { ArticleService } from '../services/article.service';
import {subcategories} from '../configs/data-config';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss']
})
export class ArticleOverviewComponent implements OnInit, OnDestroy {

  articles: Article[] = [];
  articleSubscription: Subscription;
  count: number;
  sites: number;
  filterSearch = '';
  selectedCategory: Category;
  selectedSubcategory: Subcategory;
  subcategories: Subcategory[] = [];
  subcatVisible = false;

  descOrder: string;
  orderValue: string;

  constructor(private articleService: ArticleService, public selectionService: SelectionService, public authService: AuthServiceMail) { }

  ngOnInit() {
    this.filterSearch = this.selectionService.filterSearch;
    this.getArticles(true);
    this.selectedCategory = this.selectionService.selectedCategory;
    this.selectedSubcategory = this.selectionService.selectedSubcategory;
    if (this.selectedCategory) {
      this.subcategories = subcategories.filter(sub => sub.category === this.selectedCategory.id);
    }
    this.descOrder = this.selectionService.descOrder;
    this.orderValue = this.selectionService.orderValue;
  }

  ngOnDestroy() {
    this.selectionService.filterSearch = this.filterSearch;
  }

  getArticles(pageChange?: boolean): void {
    if (!pageChange) {
      this.selectionService.currentSiteArticleList = 1;
      this.selectionService.pageChange = false;
    } else {
      this.selectionService.pageChange = true;
    }
    this.selectionService.setLoading(true);
    if ( this.articleSubscription ) {
      this.articleSubscription.unsubscribe();
   }
    this.articleSubscription = this.articleService.getArticles().subscribe(articleObject => {
        this.selectionService.setLoading(false);
        if (articleObject) {
          this.articles = articleObject.articles;
          this.count = articleObject.count;
          this.sites = articleObject.sites;
        }
    });
  }

  onSearch() {
    this.selectionService.filterSearch = this.filterSearch;
    this.getArticles();
  }

  categoryChange(category: Category) {
    this.selectionService.selectedCategory = category;
    this.selectedCategory = category;
    if (!this.selectedCategory) {
      this.subcategories = [];
    } else {
      this.subcategories = subcategories.filter(sub => sub.category === this.selectedCategory.id);
    }
    this.selectedSubcategory = null;
    this.selectionService.selectedSubcategory = null;
    this.getArticles();
  }

  selectedSubcategoryChange(subcategory: Subcategory) {
    this.selectedSubcategory = subcategory;
    this.selectionService.selectedSubcategory = subcategory;
    this.getArticles();
  }

  setDesc() {
    this.descOrder = 'desc';
    this.selectionService.descOrder = 'desc';
    this.getArticles();
  }

  setAsc() {
    this.descOrder = 'asc';
    this.selectionService.descOrder = 'asc';
    this.getArticles();
  }

  orderValueChange(orderValue) {
    this.selectionService.orderValue = orderValue;
    this.getArticles();
  }

  pageChange(currentSite: number) {
    this.selectionService.currentSiteArticleList = currentSite;
    this.getArticles(true);
    this.selectionService.pageChangeSubject.next(true);
  }

  toggleSubcat() {
    this.subcatVisible = !this.subcatVisible;
  }
}
