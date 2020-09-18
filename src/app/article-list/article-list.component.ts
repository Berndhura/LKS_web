import { placeholderImage } from './../configs/data-config';
import { ArticleService } from './../services/article.service';
import { User, Seller } from './../types/user.model';
import { AuthServiceMail } from './../services/auth.service';
import { Article } from './../types/article.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @Input() filteredArticles: Article[];
  @Input() user: User;
  @Input() seller: Seller;
  @Input() loading: boolean;
  @Output() deleteBookmarkOutput = new EventEmitter<string>();

  placeholderImage = placeholderImage;

  constructor(
    public authServiceMail: AuthServiceMail,
    private articleService: ArticleService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  addBookmark(articleId: string) {
    this.articleService.addBookmarkArticle(articleId);
  }

  deleteBookmark(articleId: string) {
    this.articleService.deleteBookmarkArticle(articleId);
    this.deleteBookmarkOutput.emit(articleId);
  }
}
