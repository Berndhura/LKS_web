import { Category, Subcategory } from './category.model';
export class Article {
    id: number;
    category: string;
    categoryInfo: Category;
    subcategory: string;
    subcategoryInfo: Subcategory;
    zustand = '';
    shipping: string;
    title = '';
    description = '';
    urls = '';
    userId = '';
    price: number;
    priceStatus = '';
    distance: number;
    date: Date = new Date();
    views: number;
    locations: string[];
    locationsGeodata: LocationData[];
    bookmarks: number;
    pictureIds: string[];
    sellerName?: string;
    sellerProfilePictureUrl?: string;
    sellerMail?: string;
    sellerPhone?: string;
}

export class LocationData {
  name: string;
  lat: number;
  lng: number;
}

export class ArticlesImages {
  id: number;
  label: string;
  imgUrl: any;
  imgFile: File;
}

export class PriceStatus {
  short: string;
  long: string;
}

export class Shipping {
  shipping: boolean;
  label: string;
}
