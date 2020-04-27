import { pictureUrl } from '../configs/config';
import { Category } from '../types/category.model';
import { SelectionService } from '../services/selection.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../types/article.model';
import { ArticleService } from '../services/article.service';
import {categories, subcategories} from '../configs/data-config';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss']
})
export class ArticleOverviewComponent implements OnInit {

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
}
