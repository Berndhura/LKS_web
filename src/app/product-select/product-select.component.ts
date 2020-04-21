import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';

@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {

  products: Product[] = [
    {product: 'windsurfing', src: '../../assets/images/products/windsurfing.jpg', label: 'Windsurfen'},
    {product: 'kitesurfing', src: '../../assets/images/products/kitesurfing.jpg', label: 'Kitesurfen'},
    {product: 'wavesurfing', src: '../../assets/images/products/wavesurfing.jpg', label: 'Wellenreiten'},
    {product: 'wetsuits', src: '../../assets/images/products/neopren.jpg', label: 'Neopren'},
    {product: 'bullis', src: '../../assets/images/products/surfmobil.jpg', label: 'Surfmobile'},
    {product: 'journeys', src: '../../assets/images/products/surfreisen.jpg', label: 'Surfreisen'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
