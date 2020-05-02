import { LocationData } from './article.model';
import { Category } from './category.model';
export interface User {
    email: string;
    userId: string;
}

export class Seller {
    id: string;
    userId: string;
    name: string;
    profilePictureUrl?: string;
    category?: Category;
    categoryId?: string;
    homespot?: LocationData;
    email: string;
    phone?: string;
    bookmarks?: number[];
}
