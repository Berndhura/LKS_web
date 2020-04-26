import { SelectionService } from './selection.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../types/article.model';
import { Seller } from '../types/user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {articles} from '../../assets/dummyDaten/dummy-articles';
import {seller} from '../../assets/dummyDaten/dummy-user';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private selectionService: SelectionService) { }


  // Dieser Endpunkt soll gefilterte Article liefern, die Filterung ist optional
  getArticles(): Observable<Article[]> {
    let copyArticles = JSON.parse(JSON.stringify(articles));
    if (this.selectionService.selectedCategory) {
      copyArticles = articles.filter(article => article.category.includes(this.selectionService.selectedCategory.id));
    }
    return of(copyArticles);
    // return this.http.get<Article[]>('http://52.29.200.187/api/V3/articles?lat=54.354576638586884&lng=12.706493139266968&distance=10000000&page=0&size=10');
  }

  // Dieser Endpunkt liefert einen Artikel
  getArticle(id: number): any {
    const index = articles.findIndex(a => a.id == id);
    const article = articles[index];
    return of(article);
    // return this.http.get<Article>('http://52.29.200.187/api/V3/articles/' + id);
  }

  // Dieser Endpunkt fügt einem Artikel +1 Bookmark hinzu und einem seller eine articleID in Bookmarks
  addBookmarkArticle(articleId: number, sellerId: string) {
    const index = articles.findIndex(a => a.id == articleId);
    articles[index].bookmarks = articles[index].bookmarks + 1;
    seller.bookmarks.push(articleId);
  }

    // Dieser Endpunkt fügt einem Artikel -1 Bookmark hinzu und löscht dem Seller die ArticleID in Bookmarks
    deleteBookmarkArticle(articleId: number, sellerId: string) {
      const index = articles.findIndex(a => a.id == articleId);
      articles[index].bookmarks = articles[index].bookmarks - 1;
      seller.bookmarks.splice(seller.bookmarks.indexOf(articleId), 1);
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
