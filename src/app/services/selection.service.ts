import { Subcategory } from './../types/category.model';
import { Category } from '../types/category.model';
import { Injectable } from '@angular/core';
import { Article } from '../types/article.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedCategory: Category;
  selectedSubcategory: Subcategory;

  constructor() { }


  getPrice(article: Article): string {
    if (article.priceStatus === 'FP') {
      return article.price + ' € FP';
    } else if (article.priceStatus === 'VB' && article.price) {
      return article.price + ' € VB';
    } else if (!article.price) {
      return 'VB';
    }
  }
}
