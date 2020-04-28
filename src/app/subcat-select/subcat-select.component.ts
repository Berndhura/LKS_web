import { Subcategory } from './../types/category.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subcat-select',
  templateUrl: './subcat-select.component.html',
  styleUrls: ['./subcat-select.component.scss']
})
export class SubcatSelectComponent implements OnInit {

  @Input() subcategories: Subcategory[];
  @Input() selectedSubcategory: Subcategory;

  @Output() selectedSubcategoryChange = new EventEmitter<Subcategory>();

  constructor() { }

  ngOnInit() {
  }

  selectSubcat(subcat: Subcategory) {
    if (this.selectedSubcategory && this.selectedSubcategory.id === subcat.id) {
      this.selectedSubcategory = null;
    } else {
      this.selectedSubcategory = subcat;
    }
    this.selectedSubcategoryChange.emit(this.selectedSubcategory);
  }

}
