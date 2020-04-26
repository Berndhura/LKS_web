import { Category } from './../types/category.model';
import { categories } from './../configs/data-config';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.scss']
})
export class ProductSelectComponent implements OnInit {

  categories: Category[] = categories;
  @Input() selectedCategory: Category;
  @Output() selectedCategoryChange = new EventEmitter<Category>();

  constructor() { }

  ngOnInit() {
  }

  changeCategory(category: Category) {
    if (this.selectedCategory) {
      if (this.selectedCategory.id === category.id) {
        this.selectedCategory = undefined;
      } else {
        this.selectedCategory = category;
      }
    } else {
      this.selectedCategory = category;
    }

    this.selectedCategoryChange.emit(this.selectedCategory);
  }

}
