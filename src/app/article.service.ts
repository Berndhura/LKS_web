import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './article';
import { ARTICLES } from './mock-articles';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    const articles: Article[] = ARTICLES;
    return of(articles);
    //return this.http.get<Article[]>("http://52.29.200.187/api/V3/articles?lat=54.35&lng=12&distance=10000000&page=0&size=10");
  }

  getArticle(key: string): Observable<Article> {
    const articles: Article[] = ARTICLES.filter(a => a.key === key);
    return of(articles[0]);
  }
}
