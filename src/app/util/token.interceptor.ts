import { AuthServiceMail } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthServiceMail) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.sessionToken) {
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.authService.sessionToken}`
            }
          });
    }
    return next.handle(request);
  }
}
