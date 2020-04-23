import { Product } from './../types/product';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {products} from '../configs/data-config'

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.scss']
})
export class ProductSelectComponent implements OnInit {

  products: Product[] = products;
  @Input() selectedProduct: Product;
  @Output() selectedProductChange = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  changeProduct(product: Product) {
    if (this.selectedProduct) {
      if (this.selectedProduct.product === product.product) {
        this.selectedProduct = undefined;
      } else {
        this.selectedProduct = product;
      }
    } else {
      this.selectedProduct = product;
    }

    this.selectedProductChange.emit(this.selectedProduct);
  }

}
