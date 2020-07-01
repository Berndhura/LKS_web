import { Subcategory, Category } from './../types/category.model';
import { pictureUrl } from '../configs/config';
import { SelectionService } from '../services/selection.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from '../types/article.model';
import { ArticleService } from '../services/article.service';
import {categories, subcategories} from '../configs/data-config';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss']
})
export class ArticleOverviewComponent implements OnInit, OnDestroy {

  articles: Article[] = [];
  filteredArticles: Article[] = [];
  filterSearch = '';
  selectedCategory: Category;
  selectedSubcategory: Subcategory;
  subcategories: Subcategory[] = [];
  subcatVisible = false;

  descOrder: string;
  orderValue: string;

  pictureUrl: string = pictureUrl;

  constructor(private articleService: ArticleService, private selectionService: SelectionService) { }

  ngOnInit() {
    this.filterSearch = this.selectionService.filterSearch;
    this.getArticles();
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

  getArticles(): void {
    this.articleService.getArticles().subscribe(articles => {
        this.articles = articles;
        this.onSearchChange(this.filterSearch);
        });
  }

  onSearchChange(search: string) {
    const s = search.toLowerCase();
    this.filteredArticles = this.articles.filter(article => {
      const title = article.title.toLowerCase();
      return title.includes(s);
    });
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

  toggleSubcat() {
    this.subcatVisible = !this.subcatVisible;
  }
}
