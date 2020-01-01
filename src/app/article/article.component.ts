import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article = null;
  user: User = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const key = params.key;
      this.articleService.getArticle(key).subscribe(article => {
        if (article === undefined) {
          this.router.navigateByUrl('404');
          return;
        }
        this.article = article;
        this.article.uri = 'http://52.29.200.187/api/V3/pictures/' + article.pictureIds[0];
        console.log(this.article);
        this.articleService.getUserInfo(article.userId, 'cYhkRXSC9Xw:APA91bFMfO77q6Dza7PaREhTBUZmQ3lpAhMNySocOROFJId9Uh_hGwfvYc2X-dhliXh_tJ4RceOYNHEx6YKh-eQ4LkSULgDz0nqCgUDff58gGGnz1P2uEH8O-j4sYnxgR86O-rIq1rSP').subscribe(user => {
          this.user = user;
          console.log(this.user);
        });
      }
      );
    });
  }
}
