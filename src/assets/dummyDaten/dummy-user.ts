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
    categoryId: 'windsurfing',
    email: 'philipp.matzel@outlook.com',
    homespot: 'Greifswald',
    phone: '01635687582',
    bookmarks: [6769],
};
