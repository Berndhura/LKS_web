import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import {products} from '../configs/data-config'

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {

  products: Product[] = products;

  constructor() { }

  ngOnInit() {
  }

}
