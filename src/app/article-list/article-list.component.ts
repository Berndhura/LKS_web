import { Component, OnInit } from '@angular/core';
import { Article } from '../types/article';
import { ArticleService } from '../services/article.service';
import {products, subcategories} from '../configs/data-config'
import { Product } from '../types/product';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];
  suche: string;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService
      .getArticles()
      .subscribe(articles => {
        this.articles = articles["ads"];
        for (const article of this.articles) {
          article.uri = 'http://52.29.200.187/api/V3/pictures/' + article.pictureIds[0];
          article.date = new Date(article.date);
        }
        });
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
