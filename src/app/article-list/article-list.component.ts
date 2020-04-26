import { pictureUrl } from './../configs/config';
import { Category } from '../types/category.model';
import { SelectionService } from './../services/selection.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../types/article.model';
import { ArticleService } from '../services/article.service';
import {categories, subcategories} from '../configs/data-config';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];
  filteredArticles: Article[] = [];
  filterSearch = '';
  selectedCategory: Category;

  pictureUrl: string = pictureUrl;

  constructor(private articleService: ArticleService, private selectionService: SelectionService) { }

  ngOnInit() {
    this.getArticles();
    this.selectedCategory = this.selectionService.selectedCategory;
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
    this.getArticles();
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
      return locations[0] + ' ++';
    } else {
      return locations[0];
    }
  }

  getLocationTooltip(locations: string[]): string {
    return locations.toString();
  }
}
