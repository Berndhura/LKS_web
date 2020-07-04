import { AlertService } from './alert.service';
import { baseUrl } from './../../environments/environment';
import { UploadService } from './upload.service';
import { categories } from './../configs/data-config';
import { user, seller } from './../../assets/dummyDaten/dummy-user';
import { User, Seller } from './../types/user.model';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { auth } from 'firebase/app';
import { AuthData } from '../types/auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth} from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class AuthServiceMail {
    public isAuthenticated = false;
    authChange = new Subject<boolean>();

    user: User;
    seller: Seller;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private ngZone: NgZone,
        private uploadService: UploadService,
        private alertService: AlertService,
        private http: HttpClient) {
    }

    setSellerCategory(currentSeller: Seller) {
        const index = categories.findIndex(c => c.id === currentSeller.categoryId);
        this.seller.category = categories[index];
    }

    // Endpunkt der ein Update des Seller durchführt
    // Token wird benötigt
    updateSeller(imgFile: File) {
        if (imgFile) {
            this.uploadService.uploadImage(imgFile, this.user.id).subscribe(imgUrl => {
                this.seller.profilePicture = imgUrl;
                console.log('neuesImg:', imgUrl);
                console.log('Endpunkt Update Seller: ', this.seller);
            });
        } else {
            console.log('altesImg:', this.seller.profilePicture);
            console.log('Endpunkt Update Seller: ', this.seller);
        }
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

    getFirebaseUser(firebaseUser: any) {
        this.http.get<User>(baseUrl + '/firebaseuser', {params: {firebasetoken: firebaseUser.xa}}).pipe(
            catchError(err => {
                this.alertService.openAlert('Fehler Anmeldung');
                return of(null);
              })
        ).subscribe(signedUser => {
            this.user = signedUser;
            if (signedUser) {
                this.getSeller(signedUser.id);
            }
        });
    }

    getSeller(userId: string) {
        this.http.get<Seller>(baseUrl + '/seller', {params: {userid: userId}}).pipe(
            catchError(err => {
                this.alertService.openAlert('Fehler Anmeldung');
                return of(null);
              })
        ).subscribe(signedSeller => {
            this.seller = signedSeller;
            if (this.user && this.seller) {
                this.authChange.next(true);
                this.isAuthenticated = true;
                this.router.navigate(['/articles']);
            }
        });
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            const firebaseUser: any = result.user;
            this.getFirebaseUser(firebaseUser);
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
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
        this.user = null;
        this.seller = null;
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
