export class Article {
    id: number;
    category = '';
    subcategory = '';
    zustand = '';
    shipping: boolean;
    title = '';
    description = '';
    urls = '';
    userId = '';
    price: number;
    priceStatus = '';
    distance: number;
    date: Date = new Date();
    views: number;
    locations: LocationData[];
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
