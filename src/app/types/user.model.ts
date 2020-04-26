import { Article } from './article.model';

export interface User {
    email: string;
    userId: string;
}

export class Seller {
    id: string;
    userId: string;
    name: string;
    profilePictureUrl: string;
    product: string;
    email: string;
    bookmarks: number[];
}
