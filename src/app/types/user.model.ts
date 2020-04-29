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
    homespot?: string;
    email: string;
    phone?: string;
    bookmarks?: number[];
}
