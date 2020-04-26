import { User, Seller } from './../../app/types/user.model';

export const user: User = {
    email: 'philipp.matzel@outlook.com',
    userId: '1',
};

export const seller: Seller = {
    id: '1',
    userId: '1',
    name: 'Philipp',
    profilePictureUrl: '../../assets/images/profilbild.jpg',
    product: 'windsurfing',
    email: 'philipp.matzel@outlook.com',
    bookmarks: [6769]
}
