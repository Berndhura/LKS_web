import { User, Seller } from './../../app/types/user.model';

export const user: User = {
    email: 'philipp.matzel@outlook.com',
    id: '1',
};

export const seller: Seller = {
    id: '1',
    userId: '1',
    name: 'Philipp',
    profilePicture: 'o/users%2F1%2Fprofilepicture?alt=media',
    categoryId: 'windsurfing',
    email: 'philipp.matzel@outlook.com',
    homespot: {name: 'Greifswald', lat: 54.093630810050485, lng: 13.382720947265625},
    phone: '01635687582',
    bookmarks: [6769],
};
