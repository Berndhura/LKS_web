import { Product } from '../types/product.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedProduct: Product;

  constructor() { }
}
