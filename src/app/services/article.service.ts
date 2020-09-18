import { LocationService } from './location.service';
import { AlertService } from './alert.service';
import { Subcategory } from './../types/category.model';
import { AuthServiceMail } from './auth.service';
import { SelectionService } from './selection.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article, ArticleObject } from '../types/article.model';
import { Seller } from '../types/user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {baseUrl} from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {lengthSiteList} from '../configs/data-config';

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


  getArticles(): Observable<ArticleObject> {

    let selectedCategory = '';
    let selectedSubategory = '';
    const currentOffset = this.calculateOffset(this.selectionService.currentSiteArticleList);

    if (this.selectionService.selectedCategory) {
      selectedCategory = this.selectionService.selectedCategory.id;
    }
    if (this.selectionService.selectedSubcategory) {
      selectedSubategory = this.selectionService.selectedSubcategory.id;
    }

    return this.http.get<ArticleObject>(baseUrl + '/articles', {params: {
      category: selectedCategory,
      subcategory: selectedSubategory,
      searchFilter: this.selectionService.filterSearch,
      ordervalue: this.selectionService.orderValue,
      orderdirection: this.selectionService.descOrder,
      offset: currentOffset,
    }}).pipe(
      map(articleObject => {
        articleObject = this.handleArticleInfos(articleObject);
        return articleObject;
      }),
      catchError(err => {
        this.alertService.openAlert('Fehler beim Laden der Artikel', 'error');
        return of(null);
      })
    );
  }

  calculateOffset(currentSite): string {
    const offset = (currentSite * lengthSiteList) - lengthSiteList;
    return offset.toString();
  }

  handleArticleInfos(articleObject: ArticleObject): ArticleObject {
    articleObject.articles.forEach(article => {
      article.categoryInfo = this.selectionService.getCategory(article.category);
      article.subcategoryInfo = this.selectionService.getSubCategory(article);
      article.priceInfo = this.selectionService.getPrice(article);
      article.locationInfo = this.selectionService.getLocation(article.locations);
    });
    return articleObject;
  }

  getBookmarkedArticles(): Observable<ArticleObject> {
    const currentOffset = this.calculateOffset(this.selectionService.currentSiteUserArticleList);
    return this.http.get<ArticleObject>(baseUrl + '/bookmarkedarticles', {params: {
      offset: currentOffset,
    }}).pipe(
      map(articleObject => {
        articleObject = this.handleArticleInfos(articleObject);
        return articleObject;
      }),
      catchError(err => {
        this.alertService.openAlert('Fehler beim Laden der Artikel', 'error');
        return of(null);
      })
    );
  }


  getOwnerArticles(): Observable<ArticleObject> {
    const currentOffset = this.calculateOffset(this.selectionService.currentSiteUserArticleList);
    return this.http.get<ArticleObject>(baseUrl + '/ownerarticles', {params: {
      offset: currentOffset,
    }}).pipe(
      map(articleObject => {
        articleObject = this.handleArticleInfos(articleObject);
        return articleObject;
      }),
      catchError(err => {
        this.alertService.openAlert('Fehler beim Laden der Artikel', 'error');
        return of(null);
      })
    );
  }

  getArticle(articleId: string): Observable<Article> {
    return this.http.get<Article>(baseUrl + '/article', {params: {id: articleId.toString()}}).pipe(
      map(article => {
        article.categoryInfo = this.selectionService.getCategory(article.category);
        article.subcategoryInfo = this.selectionService.getSubCategory(article);
        article.priceInfo = this.selectionService.getPrice(article);
        return article;
      }),
      catchError(err => {
        this.alertService.openAlert('Fehler beim Laden des Artikel', 'error');
        return of(null);
      })
    );
  }

  upsertArticle(article: Article): Observable<void | string> {
    return this.http.post<void>(baseUrl + '/article', article).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler beim Speichern der Anzeige', 'error');
        return of('error');
      })
    );
  }

  extendArticle(articleId: string): Observable<string> {
    return this.http.post<string>(baseUrl + '/article/extend', {id: articleId}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler beim Verlängern der Anzeige', 'error');
        return of('error');
      })
    );
  }

  activateArticle(articleId: string): Observable<string> {
    return this.http.post<string>(baseUrl + '/article/activate', {id: articleId}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler beim Aktivieren der Anzeige', 'success');
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
        this.alertService.openAlert('Fehler beim Löschen der Anzeige', 'error');
        return of('error');
      })
    );
  }

  addBookmarkArticle(articleid: string): void {
    this.http.post<void>(baseUrl + '/bookmark', {articleId: articleid}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler beim Hinzufügen des Favoriten', 'error');
        return of('error');
      })
    ).subscribe(result => {
      if (result !== 'error') {
        this.authServiceMail.seller.bookmarks.push(articleid);
      }
    });
  }

  deleteBookmarkArticle(articleid: string): void {
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
        this.alertService.openAlert('Fehler beim Entfernen des Favoriten', 'error');
        return of(null);
      })
    ).subscribe(() => {
      this.authServiceMail.seller.bookmarks.splice(this.authServiceMail.seller.bookmarks.indexOf(articleid), 1);
    });
  }

  sendMessage(id: string, sender: string, mess: string) {
    this.http.post<void | string>(baseUrl + '/article/message', {articleId: id, senderMail: sender, message: mess}).pipe(
      catchError(err => {
        this.alertService.openAlert('Fehler beim Versenden der Nachricht', 'error');
        return of('error');
      })
    ).subscribe(result => {
        if (result !== 'error') {
          this.alertService.openAlert('Nachricht erfolgreich versendet', 'success');
        }
    });
  }
}
