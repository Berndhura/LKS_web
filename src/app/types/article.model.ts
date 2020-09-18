import { Category, Subcategory } from './category.model';
import { NumberSymbol } from '@angular/common';

export class ArticleObject {
  count: number;
  sites: number;
  articles: Article[];
}

export class Article {
    id: string;
    inactive: boolean;
    validTo: Date;
    journeyFrom?: Date;
    journeyTo?: Date;
    extended: number;
    category: string;
    categoryInfo: Category;
    subcategory: string;
    subcategoryInfo: Subcategory;
    condition: string;
    shipping: string;
    title: string;
    description: string;
    userId: string;
    price: number;
    priceStatus: string;
    priceInfo: string;
    createdAt: Date;
    views: number;
    locations: string[];
    locationInfo: string;
    mapLocation: boolean;
    locationsGeodata: LocationData[];
    bookmarks: number;
    pictureUrls: string[];
    sellerName?: string;
    sellerProfilePictureUrl?: string;
    sellerEmail?: string;
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
