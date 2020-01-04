import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { auth } from 'firebase/app';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class AuthServiceEmail {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private afAuth: AngularFireAuth, private ngZone: NgZone) {

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
