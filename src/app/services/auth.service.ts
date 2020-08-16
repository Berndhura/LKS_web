import { AlertService } from './alert.service';
import { baseUrl } from './../../environments/environment';
import { UploadService } from './upload.service';
import { categories } from './../configs/data-config';
import { User, Seller } from './../types/user.model';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { auth } from 'firebase/app';
import { AuthData } from '../types/auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth} from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { firebaseImageUrl, staticImages } from './../configs/config';
import { SelectionService } from './selection.service';


@Injectable()
export class AuthServiceMail {
    public isAuthenticated = false;
    authChange = new Subject<boolean>();
    triggerLocalStorageLogin = false;
    sessionToken: string;

    user: User;
    seller: Seller;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private ngZone: NgZone,
        private uploadService: UploadService,
        private alertService: AlertService,
        private selectionService: SelectionService,
        private http: HttpClient) {
    }

    getAuthStatus() {
        return this.authChange.asObservable();
    }

    // Endpunkt der ein Update des Seller durchführt
    // Token wird benötigt
    async updateSeller(imgFile: File, seller: Seller): Promise<void | string> {
        if (imgFile) {
            await this.uploadProfileImage(imgFile).then(imgUrl => {
                seller.profilePicture = imgUrl;
            });
            return this.updateSellerHttp(seller);
        } else {
            return this.updateSellerHttp(seller);
        }
    }

    uploadProfileImage(imgFile: File): Promise<string> {
        return new Promise((resolve, reject) => {
            this.uploadService.uploadImage(imgFile, this.user.id).subscribe(imgUrl => {
                resolve(imgUrl);
            });
        });
    }

    updateSellerHttp(seller: Seller): Promise<void | string> {
        return this.http.put<void>(baseUrl + '/seller', seller).pipe(
            catchError(err => {
              this.alertService.openAlert('Fehler');
              return of('error');
            })
          ).toPromise();
    }


    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.http.post<void>(baseUrl + '/user', {id: result.user.uid, email: result.user.email}).subscribe();
        })
        .catch(error => {
            console.log(error);
        });
    }

    deleteUser() {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
              userId: this.user.id,
            }
          };
        this.http.delete<void>(baseUrl + '/user', options).pipe(
            catchError(err => {
                this.alertService.openAlert('Fehler Löschen Nutzer');
                return of('error');
              })
        ).subscribe(result => {
            if (result !== 'error') {
                this.logout();
                this.alertService.openAlert('Nutzer erfolgreich gelöscht');
            }
        });
    }

    getFirebaseUser(firebaseUser: any) {
        this.http.get<User>(baseUrl + '/firebaseuser', {params: {firebasetoken: firebaseUser.xa}}).pipe(
            catchError(err => {
                this.alertService.openAlert('Fehler Anmeldung');
                return of(null);
              })
        ).subscribe(signedUser => {
            this.handleUser(signedUser);
            this.router.navigate(['/articles']);
        });
    }

    checkLocalSessionToken() {
        const sessionToken = localStorage.getItem('sessionToken');
        if (sessionToken) {
            this.triggerLocalStorageLogin = true;
            this.http.get<User>(baseUrl + '/sessionuser', {params: {sessiontoken: sessionToken}}).pipe(
                catchError(err => {
                    this.alertService.openAlert('Fehler Anmeldung');
                    return of(null);
                  })
            ).subscribe(signedUser => {
                if (signedUser) {
                    this.handleUser(signedUser);
                }
            });
        }
    }

    handleUser(signedUser) {
        this.sessionToken = signedUser.token;
        localStorage.setItem('sessionToken', this.sessionToken);
        delete signedUser.token;
        this.user = signedUser;
        if (signedUser) {
            this.getSeller();
        }
    }

    getSeller() {
        this.http.get<Seller>(baseUrl + '/seller').pipe(
            catchError(err => {
                this.alertService.openAlert('Fehler Anmeldung');
                return of(null);
              })
        ).subscribe(signedSeller => {
            signedSeller.categoryInfo = this.selectionService.getCategory(signedSeller.category);
            this.seller = signedSeller;
            if (this.user && this.seller) {
                this.triggerLocalStorageLogin = false;
                this.isAuthenticated = true;
                this.authChange.next(true);
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
        localStorage.removeItem('sessionToken');
        this.isAuthenticated = false;
        this.sessionToken = null;
        this.user = null;
        this.seller = null;
    }
}
