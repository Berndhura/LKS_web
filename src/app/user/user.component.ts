import { ArticleService } from './../services/article.service';
import { Article } from './../types/article.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  step = 1;
  bookmarkedArticles: Article[];
  ownerArticles: Article[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getBookmarkedArticles().subscribe(articles => {
      this.bookmarkedArticles = articles;
    });

    this.articleService.getOwnerArticles().subscribe(articles => {
      this.ownerArticles = articles;
    });
  }

  setStep(index: number) {
    this.step = index;
  }
}
