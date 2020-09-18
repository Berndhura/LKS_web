
import { Subcategory, Category } from './../types/category.model';
import { Injectable } from '@angular/core';
import { Article } from '../types/article.model';
import { categories, subcategories, loadingTimer } from './../configs/data-config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  loading: boolean;
  timerLoading: any;
  pageChange: boolean;
  pageChangeSubject = new Subject<boolean>();

  selectedCategory: Category;
  selectedSubcategory: Subcategory;

  descOrder = 'desc';
  orderValue = 'date';

  currentArticle: Article;

  filterSearch = '';

  currentSiteArticleList = 1;
  currentSiteUserArticleList = 1;

  constructor() {
   }

  setLoading(enable: boolean) {
    if (enable) {
      this.timerLoading = setTimeout(() => {
        this.loading = true;
      }, loadingTimer);
    } else {
      clearTimeout(this.timerLoading);
      this.loading = false;
    }
  }


  getPrice(article: Article): string {
    if (article.priceStatus === 'Festpreis') {
      return article.price + ' € FP';
    } else if (article.priceStatus === 'Verhandlungsbasis' && article.price) {
      return article.price + ' € VB';
    } else if (!article.price) {
      return 'VB';
    }
  }

  getCategory(category: string): Category {
    const index = categories.findIndex(c => c.id === category);
    return categories[index];
  }

  getSubCategory(article: Article): Subcategory {
    const index = subcategories.findIndex(s => (s.category === article.category && s.id === article.subcategory));
    return subcategories[index];
  }

  getLocation(locations: string[]): string {
    if (locations) {
      if (locations.length > 1) {
        return locations[0] + ',...';
      } else {
        return locations[0];
      }
    }
  }
}
