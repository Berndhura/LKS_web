import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './article';
import { SellerInfo } from './seller';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('http://52.29.200.187/api/V3/articles?lat=54.354576638586884&lng=12.706493139266968&distance=10000000&page=0&size=10');
  }

  getArticle(id: number): Observable<Article> {
    //const articles: Article[] = ARTICLES.filter(a => a.id === id);
    //return of(articles[0]);
    return this.http.get<Article>('http://52.29.200.187/api/V3/articles/' + id);
  }

  getUserInfo(userId: string, userToken: string): Observable<SellerInfo> {
    return this.http.get<SellerInfo>('http://52.29.200.187/api/V3/users/' + userId + '/?token' + userToken);
  }
}
