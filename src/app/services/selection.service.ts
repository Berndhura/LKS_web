import { Subject } from 'rxjs/Subject';
import { Subcategory, Category } from './../types/category.model';
import { Injectable } from '@angular/core';
import { Article } from '../types/article.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { categories, subcategories } from './../configs/data-config';

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

  getCategory(categoryId: string): Category {
    const index = categories.findIndex(c => c.id === categoryId);
    return categories[index];
  }

  getSubCategory(article: Article): Subcategory {
    const index = subcategories.findIndex(s => (s.category === article.category && s.id === article.subcategory));
    return subcategories[index];
  }
}
