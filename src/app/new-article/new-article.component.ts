import { SelectionService } from './../services/selection.service';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { Component, OnInit } from '@angular/core';
import { Subcategory, Category } from '../types/category.model';
import { subcategories, zustand } from '../configs/data-config';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  seller: Seller;
  selectedCategory: Category;
  selectedSubcategory: Subcategory;
  subcategories: Subcategory[] = [];
  zustandList = zustand;

  constructor(private authServiceMail: AuthServiceMail, private selectionService: SelectionService) { }

  ngOnInit() {
    this.seller = this.authServiceMail.seller;
    this.selectedCategory = this.seller.category;
    this.selectedSubcategory = this.selectionService.selectedSubcategory;
    if (this.selectedCategory) {
      this.subcategories = subcategories.filter(sub => sub.category === this.selectedCategory.id);
    }
  }

}
