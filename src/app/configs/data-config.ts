import { Product } from '../types/product';


export const products: Product[] = [
    {product: 'windsurfing', src: '../../assets/images/products/windsurfing.jpg', label: 'Windsurfen'},
    {product: 'kitesurfing', src: '../../assets/images/products/kitesurfing.jpg', label: 'Kitesurfen'},
    {product: 'wavesurfing', src: '../../assets/images/products/wavesurfing.jpg', label: 'Wellenreiten'},
    {product: 'wetsuits', src: '../../assets/images/products/neopren.jpg', label: 'Neopren'},
    {product: 'bullis', src: '../../assets/images/products/surfmobil.jpg', label: 'Surfmobile'},
    {product: 'journeys', src: '../../assets/images/products/surfreisen.jpg', label: 'Surfreisen'},
  ];

export const subcategories = [
      {product: 'windsurfing', subcategory: 'sail', src: '../../assets/images/products-windsurfing/sail.gif'}
  ];
