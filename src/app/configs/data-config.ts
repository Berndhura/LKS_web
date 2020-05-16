import { Category, Subcategory } from '../types/category.model';
import { PriceStatus, Shipping } from '../types/article.model';
import { AboutUs } from '../types/about.model';


export const categories: Category[] = [
    {id: 'windsurfing', src: '../../assets/images/products/windsurfing.jpg', label: 'Windsurfen'},
    {id: 'kitesurfing', src: '../../assets/images/products/kitesurfing.jpg', label: 'Kitesurfen'},
    {id: 'wavesurfing', src: '../../assets/images/products/wavesurfing.jpg', label: 'Wellenreiten'},
    {id: 'neopren', src: '../../assets/images/products/neopren.jpg', label: 'Neopren'},
    {id: 'bullis', src: '../../assets/images/products/surfmobil.jpg', label: 'Surfmobile'},
    {id: 'journeys', src: '../../assets/images/products/surfreisen.jpg', label: 'Surfreisen'},
  ];

export const subcategories: Subcategory[] = [
      {category: 'windsurfing', id: 'sail', label: 'Segel', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'windsurfing', id: 'bag', label: 'Bags', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'windsurfing', id: 'mastbase', label: 'Mastfuß', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'windsurfing', id: 'trapez', label: 'Trapeze', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'windsurfing', id: 'fin', label: 'Finnen', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'windsurfing', id: 'board', label: 'Boards', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'windsurfing', id: 'boom', label: 'Gabel', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'windsurfing', id: 'mast', label: 'Masten', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'windsurfing', id: 'rest', label: 'Sonstiges', src: '../../assets/images/products-windsurfing/sail.gif'},

      {category: 'kitesurfing', id: 'kite', label: 'Kites', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'kitesurfing', id: 'board', label: 'boards', src: '../../assets/images/products-windsurfing/sail.gif'},

      {category: 'wavesurfing', id: 'longboard', label: 'Longboards', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'wavesurfing', id: 'shortboard', label: 'Shortboards', src: '../../assets/images/products-windsurfing/sail.gif'},

      {category: 'neopren', id: 'wetsuitLong', label: 'Anzug Lang', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'neopren', id: 'wetsuitShorty', label: 'Anzug Shorty', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'neopren', id: 'shoes', label: 'Schuhe', src: '../../assets/images/products-windsurfing/sail.gif'},

      {category: 'bullis', id: 'car', label: 'Surfbus', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'bullis', id: 'stuff', label: 'Zubehör', src: '../../assets/images/products-windsurfing/sail.gif'},

      {category: 'journeys', id: 'wavesurfing', label: 'Wellenreiten', src: '../../assets/images/products-windsurfing/sail.gif'},
      {category: 'journeys', id: 'kitesurfing', label: 'Kitesurfen', src: '../../assets/images/products-windsurfing/sail.gif'},
  ];

export const conditionList: string[] = ['Gebraucht', 'Neu', 'Ersatz', 'Defekt'];

export const priceStatusList: PriceStatus[] = [{short: 'VB', long: 'Verhandlungsbasis'}, {short: 'FP', long: 'Festpreis'}];

export const shippingList: Shipping[] = [{shipping: true, label: 'Versand und Abholung'}, {shipping: false, label: 'Nur Abholung'}];

export const placeholderImage = 'o/app%2Fplaceholder%2Fimage-placeholder.jpg?alt=media&token=ef57b3e5-8c92-40e8-94f0-6a022ae6ef1d';


export const aboutUs: AboutUs[] = [
  {portraitUrl: 'o/app%2Fplaceholder%2Fportrait-placeholder.png?alt=media&token=d29ae9be-1337-4d15-a56d-ca38c0d53263', name: 'Philipp', role: 'Entwickler', watersport: 'Windsurfen, Kitesurfen', favSpot: 'Loissin', mobil: 'Bulli T5 Custom', extra: 'baltic-Factory (weitere Projekte)'},
  {portraitUrl: 'o/app%2Fplaceholder%2Fportrait-placeholder.png?alt=media&token=d29ae9be-1337-4d15-a56d-ca38c0d53263', name: 'Holger', role: 'Cloud', watersport: 'Windsurfen', favSpot: 'Loissin', mobil: 'zu Fuß'},
  {portraitUrl: 'o/app%2Fplaceholder%2Fportrait-placeholder.png?alt=media&token=d29ae9be-1337-4d15-a56d-ca38c0d53263', name: 'Bernd', role: 'Gründer', watersport: 'Windsurfen', favSpot: 'Loissin', mobil: 'Defender Custom'}
];
