import { Category, Subcategory } from '../types/category.model';


export const categories: Category[] = [
    {id: 'windsurfing', src: '../../assets/images/products/windsurfing.jpg', label: 'Windsurfen'},
    {id: 'kitesurfing', src: '../../assets/images/products/kitesurfing.jpg', label: 'Kitesurfen'},
    {id: 'wavesurfing', src: '../../assets/images/products/wavesurfing.jpg', label: 'Wellenreiten'},
    {id: 'wetsuits', src: '../../assets/images/products/neopren.jpg', label: 'Neopren'},
    {id: 'bullis', src: '../../assets/images/products/surfmobil.jpg', label: 'Surfmobile'},
    {id: 'journeys', src: '../../assets/images/products/surfreisen.jpg', label: 'Surfreisen'},
  ];

export const subcategories: Subcategory[] = [
      {category: 'windsurfing', id: 'sail', label: 'Segel', src: '../../assets/images/products-windsurfing/sail.gif'}
  ];
