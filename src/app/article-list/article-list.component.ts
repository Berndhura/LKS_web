import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService
      .getArticles()
      .subscribe(articles => {
        this.articles = articles["ads"];
        for (let article of this.articles) {
          article.uri = 'http://52.29.200.187/api/V3/pictures/' + article.pictureIds[0];
        }
        });
  }
}
