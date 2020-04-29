import { categories } from './../configs/data-config';
import { user, seller } from './../../assets/dummyDaten/dummy-user';
import { User, Seller } from './../types/user.model';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { auth } from 'firebase/app';
import { AuthData } from '../types/auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class AuthServiceMail {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    user: User = user;
    seller: Seller = seller;

    constructor(private router: Router, private afAuth: AngularFireAuth, private ngZone: NgZone) {
        this.setSellerCategory(this.seller);
    }

    setSellerCategory(currentSeller: Seller) {
        const index = categories.findIndex(c => c.id === currentSeller.categoryId);
        this.seller.category = categories[index];
    }

    // Endpunkt der ein Update des Seller durchführt
    // Token wird benötigt
    updateSeller() {
        console.log('Endpunkt Update Seller: ', this.seller);
    }


    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result);
            this.authChange.next(true);
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result.user.refreshToken);
            this.authChange.next(true);
            this.router.navigate(['/articles']);
        })
        .catch(error => {
            console.log(error);
            alert(error);
        });
    }

    loginFacebook() {
        return this.AuthLogin(new auth.FacebookAuthProvider());
    }

    loginGoogle() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    AuthLogin(provider) {
        return this.ngZone.runOutsideAngular(() => {
            this.afAuth.auth.signInWithPopup(provider)
                .then((result) => {
                    this.ngZone.run(() => {
                        console.log('You have been successfully logged in!');
                        localStorage.setItem('user', JSON.stringify(result));
                        this.authChange.next(true);
                        this.router.navigate(['/articles']);
                    });
                }).catch((error) => {
                    console.log(error);
                    alert(error);
                });
            });
      }

    logout() {
        this.afAuth.auth.signOut();
        localStorage.removeItem('user');
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
