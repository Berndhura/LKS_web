import { LocationService } from './location.service';
import { AlertService } from './alert.service';
import { Subcategory } from './../types/category.model';
import { AuthServiceMail } from './auth.service';
import { SelectionService } from './selection.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../types/article.model';
import { Seller } from '../types/user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {baseUrl} from '../../environments/environment';
import { tap, map, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private selectionService: SelectionService,
    private authServiceMail: AuthServiceMail,
    private alertService: AlertService,
    private locationService: LocationService) { }


  getArticles(): Observable<Article[]> {

    let selectedCategory = '';
    let selectedSubategory = '';

    if (this.selectionService.selectedCategory) {
      selectedCategory = this.selectionService.selectedCategory.id;
    }
    if (this.selectionService.selectedSubcategory) {
      selectedSubategory = this.selectionService.selectedSubcategory.id;
    }

    return this.http.get<Article[]>(baseUrl + '/articles', {params: {
      category: selectedCategory,
      subcategory: selectedSubategory,
      ordervalue: this.selectionService.orderValue,
      orderdirection: this.selectionService.descOrder}}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of([]);
      })
    );
  }

  getBookmarkedArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(baseUrl + '/bookmarkedarticles').pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of([]);
      })
    );
  }


  getOwnerArticles(): Observable<Article[]> {

    return this.http.get<Article[]>(baseUrl + '/ownerarticles').pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of([]);
      })
    );
  }

  getArticle(articleId: string): Observable<Article> {
    return this.http.get<Article>(baseUrl + '/article', {params: {id: articleId.toString()}}).pipe(
      map(article => {
        article.categoryInfo = this.selectionService.getCategory(article.category);
        article.subcategoryInfo = this.selectionService.getSubCategory(article);
        // article.locationsGeodata = this.locationService.getGeodata(article.locations);
        return article;
      }),
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of(null);
      })
    );
  }

  upsertArticle(article: Article) {
    this.http.post(baseUrl + '/article', article).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of('error');
      })
    ).subscribe(result => {
      if (result !== 'error') {
        this.alertService.openAlert('Erfolg Upsert Article');
        this.router.navigate(['article/' + article.id]);
      }
    });
  }

  extendArticle(articleId: string): Observable<string> {
    return this.http.post<string>(baseUrl + '/article/extend', {id: articleId}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler beim Extend');
        return of('error');
      })
    );
  }

  activateArticle(articleId: string): Observable<string> {
    return this.http.post<string>(baseUrl + '/article/activate', {id: articleId}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler beim Extend');
        return of('error');
      })
    );
  }

  deleteArticle(articleid: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        articleId: articleid,
      }
    };

    return this.http.delete<void>(baseUrl + '/article', options).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of('error');
      })
    );
  }

  addBookmarkArticle(articleid: number): void {
    this.http.post<void>(baseUrl + '/bookmark', {articleId: articleid}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of('error');
      })
    ).subscribe(result => {
      if (result !== 'error') {
        this.authServiceMail.seller.bookmarks.push(articleid);
      }
    });
  }

  deleteBookmarkArticle(articleid: number): void {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        articleId: articleid,
      }
    };

    this.http.delete<void>(baseUrl + '/bookmark', options).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of(null);
      })
    ).subscribe(() => {
      this.authServiceMail.seller.bookmarks.splice(this.authServiceMail.seller.bookmarks.indexOf(articleid), 1);
    });
  }

  sendMessage(id: string, sender: string, mess: string) {
    this.http.post<void | string>(baseUrl + '/article/message', {articleId: id, senderMail: sender, message: mess}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of('error');
      })
    ).subscribe(result => {
        if (result !== 'error') {
          this.alertService.openAlert('Nachricht erfolgreich versendet');
        }
    });
  }
}
