import { LocationData } from './article.model';
import { Category } from './category.model';
export interface User {
    id: string;
    email: string;
}

export class Seller {
    id: number;
    userId: string;
    name: string;
    profilePicture?: string;
    categoryInfo?: Category;
    category?: string;
    categoryId?: string;
    location?: string;
    email: string;
    phone?: string;
    bookmarks?: number[];
}
