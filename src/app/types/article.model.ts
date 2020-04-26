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
    locationNames: string[];
    distance: number;
    date: Date = new Date();
    views: number;
    location: Location;
    bookmarks: number;
    pictureIds: string[];
    sellerName?: string;
    sellerProfilePictureUrl?: string;
    sellerMail?: string;
    sellerPhone?: string;
}

export class Location {
  type: any;
  coordinates: [number, number];
}
