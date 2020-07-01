import { Subject } from 'rxjs/Subject';
import { Subcategory } from './../types/category.model';
import { Category } from '../types/category.model';
import { Injectable } from '@angular/core';
import { Article } from '../types/article.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedCategory: Category;
  selectedSubcategory: Subcategory;

  descOrder = 'desc';
  orderValue = 'date';

  currentArticle: Article;

  filterSearch = '';

  constructor() { }


  getPrice(article: Article): string {
    if (article.priceStatus === 'Festpreis') {
      return article.price + ' € FP';
    } else if (article.priceStatus === 'Verhandlungsbasis' && article.price) {
      return article.price + ' € VB';
    } else if (!article.price) {
      return 'VB';
    }
  }
}
