import { Category } from './../types/category.model';
import { AuthServiceMail } from './../services/auth.service';
import { Seller } from './../types/user.model';
import { ArticleService } from './../services/article.service';
import { Article } from './../types/article.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  step = 0;
  bookmarkedArticles: Article[];
  ownerArticles: Article[];

  seller: Seller;

  constructor(private articleService: ArticleService, private authServiceMail: AuthServiceMail) { }

  ngOnInit() {
    this.articleService.getBookmarkedArticles().subscribe(articles => {
      this.bookmarkedArticles = articles;
    });

    this.articleService.getOwnerArticles().subscribe(articles => {
      this.ownerArticles = articles;
    });

    this.seller = this.authServiceMail.seller;
  }

  setStep(index: number) {
    this.step = index;
  }

  onProfileChange() {
    this.authServiceMail.seller = this.seller;
  }

  handleFileInput(file) {
    console.log(file);
  }

  categoryChange(category: Category) {
    this.seller.category = category;
    this.seller.categoryId = category.id;
    this.authServiceMail.seller = this.seller;
  }

  saveSeller() {
    this.authServiceMail.updateSeller();
  }
}
