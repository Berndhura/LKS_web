export interface Category {
    id: string;
    src: string;
    label: string;
}

export interface Subcategory {
    category: string;
    id: string;
    label: string;
    src: string;
}
