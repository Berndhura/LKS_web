import { Category, Subcategory } from './category.model';
export class Article {
    id: number;
    category: string;
    categoryInfo: Category;
    subcategory: string;
    subcategoryInfo: Subcategory;
    condition: string;
    shipping: string;
    title = '';
    description = '';
    urls = '';
    userId = '';
    price: number;
    priceStatus = '';
    distance: number;
    createdAt: Date = new Date();
    views: number;
    locations: string[];
    mapLocation: boolean;
    locationsGeodata: LocationData[];
    bookmarks: number;
    pictureUrls: string[];
    sellerName?: string;
    sellerProfilePictureUrl?: string;
    sellerEmail?: string;
    sellerPhone?: string;
    showPhone: boolean;
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
