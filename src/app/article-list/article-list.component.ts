import { pictureUrl } from './../configs/config';
import { Product } from '../types/product.model';
import { SelectionService } from './../services/selection.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../types/article.model';
import { ArticleService } from '../services/article.service';
import {products, subcategories} from '../configs/data-config';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];
  filteredArticles: Article[] = [];
  filterSearch = '';
  selectedProduct: Product;

  pictureUrl: string = pictureUrl;

  constructor(private articleService: ArticleService, private selectionService: SelectionService) { }

  ngOnInit() {
    this.getArticles();
    this.selectedProduct = this.selectionService.selectedProduct;
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

  productChange(product: Product) {
    this.selectionService.selectedProduct = product;
    this.getArticles();
  }

  getPictureUrl(pictureId: string): string {
    return pictureUrl + pictureId;
  }

  getProduct(category: string): Product {
    const selectedProduct = products.find(product => product.product === category);
    return selectedProduct;
  }

  getSubCat(category: string, subcategory: string): any {
    const selectedSubcategory = subcategories.find(s => (s.product === category && s.subcategory === subcategory));
    // if (!selectedSubcategory) {
    //   return '../../assets/images/questionmark.jpg';
    // }
    // return '../../assets/images/questionmark.jpg';
    return selectedSubcategory;
  }

  getPrice(article: Article): string {
    if (article.priceStatus === 'FP') {
      return article.price + ' € FP';
    } else if (article.priceStatus === 'VB' && article.price) {
      return article.price + ' € VB';
    } else if (!article.price) {
      return 'VB';
    }
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
