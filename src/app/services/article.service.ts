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
import {articles} from '../../assets/dummyDaten/dummy-articles';
import {seller} from '../../assets/dummyDaten/dummy-user';
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
    const bookmarks = this.authServiceMail.seller.bookmarks;
    let copyArticles = JSON.parse(JSON.stringify(articles));
    copyArticles = articles.filter(article => bookmarks.indexOf(article.id) !== -1);
    return of(copyArticles);
  }

  // Dieser Endpunkt liefert die Artikel eines Users
  // Benötigt Token
  // ORDER BY Date DESC
  getOwnerArticles(): Observable<Article[]> {
    const user = this.authServiceMail.user.userId;
    let copyArticles = JSON.parse(JSON.stringify(articles));
    copyArticles = articles.filter(article => article.userId === user);
    return of(copyArticles);
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

  // Dieser Endpunkt fügt einem Artikel +1 Bookmark hinzu und einem seller eine articleID in Bookmarks
  // Benötigt Token
  addBookmarkArticle(articleId: number, sellerId: string) {
    const index = articles.findIndex(a => a.id == articleId);
    articles[index].bookmarks = articles[index].bookmarks + 1;
    seller.bookmarks.push(articleId);
  }

  // Dieser Endpunkt fügt einem Artikel -1 Bookmark hinzu und löscht dem Seller die ArticleID in Bookmarks
  // Benötigt Token
  deleteBookmarkArticle(articleId: number, sellerId: string) {
    const index = articles.findIndex(a => a.id == articleId);
    articles[index].bookmarks = articles[index].bookmarks - 1;
    seller.bookmarks.splice(seller.bookmarks.indexOf(articleId), 1);
  }

  // Endpunkt soll Mail abschicken
  // Benötigt Token
  sendMessage(sellerMail: string, senderMail: string, message: string) {
    console.log('Mail: ', sellerMail, senderMail, message);
  }








  getUserInfo(userId: string, userToken: string): Observable<Seller> {
    return this.http.get<Seller>('http://52.29.200.187/api/V3/users/' + userId + '/?token' + userToken);
  }



  // bookmarkArticle(articleId: number, token: string): Observable<any> {
  //   console.log(articleId);
  //   return this.http.post<any>('http://52.29.200.187/api/V3/articles/' + articleId + '/bookmark' + '?token=' + token, null, {
  //     headers: new HttpHeaders({
  //         'Content-Type':  'application/xml',
  //         'Authorization': 'false'
  //       })
  //     });
  // }
}
