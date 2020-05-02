import { Article, LocationData } from './../types/article.model';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../types/category.model';
import { categories, subcategories } from '../configs/data-config';
import { pictureUrl } from '../configs/config';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @Input() filteredArticles: Article[];

  constructor(private selectionService: SelectionService) { }

  ngOnInit() {
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

  getLocation(locations: LocationData[]): string {
    if (locations.length > 1) {
      return locations[0].name + ' ++';
    } else {
      return locations[0].name;
    }
  }

  getLocationTooltip(locations: LocationData[]): string {
    let location = '';
    locations.forEach(l => {
      location = location + l.name + ', ';
    });
    return location;
  }

}
