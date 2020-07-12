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

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private selectionService: SelectionService,
    private authServiceMail: AuthServiceMail,
    private alertService: AlertService,
    private locationService: LocationService) { }


  // Dieser Endpunkt soll gefilterte Article liefern, die Filterung ist optional
  // alle benötigten Parameter sind im SelectionService hinterlegt
  // Filter: 1. Category, 2. Subcategory
  // Order: 1. Desc oder Asc 2. date oder price
  // Views und Bookmarks hier nicht mitschicken
  // Emails der verkäufer verschlüsseln bzw. eigentlich brauchen wir die hier nicht
  // Kein Token wird benötigt
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

  // Dieser Endpunkt liefert die Bookmarked Articles eines Users
  // Auch hier Emails der Verkäufer verschlüsseln oder garnicht erst mitschicken
  // Benötigt Token
  // ORDER BY Date DESC
  getBookmarkedArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(baseUrl + '/bookmarkedarticles').pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of([]);
      })
    );
  }

  // Dieser Endpunkt liefert die Artikel eines Users
  // Benötigt Token
  // ORDER BY Date DESC
  getOwnerArticles(): Observable<Article[]> {

    return this.http.get<Article[]>(baseUrl + '/ownerarticles').pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of([]);
      })
    );
  }

  // Dieser Endpunkt liefert einen Artikel
  // Views und Bookmarks nur mit gültigem Token mitliefern
  getArticle(articleId: number): Observable<Article> {
    return this.http.get<Article>(baseUrl + '/article', {params: {id: articleId.toString()}}).pipe(
      map(article => {
        article.categoryInfo = this.selectionService.getCategory(article);
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
    console.log(article);
    this.http.post<Article>(baseUrl + '/article', article).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of(null);
      })
    ).subscribe();
  }

  // Dieser Endpunkt fügt einem Artikel +1 Bookmark hinzu und einem seller eine articleID in Bookmarks
  // Benötigt Token
  addBookmarkArticle(articleid: number): void {
    this.http.post<void>(baseUrl + '/bookmark', {articleId: articleid}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler');
        return of(null);
      })
    ).subscribe(() => {
      this.authServiceMail.seller.bookmarks.push(articleid);
    });
  }

  // Dieser Endpunkt fügt einem Artikel -1 Bookmark hinzu und löscht dem Seller die ArticleID in Bookmarks
  // Benötigt Token

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

  // Endpunkt soll Mail abschicken
  // Benötigt Token
  sendMessage(sellerMail: string, senderMail: string, message: string) {
    console.log('Mail: ', sellerMail, senderMail, message);
  }
}
