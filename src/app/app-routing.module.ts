import { UserComponent } from './user/user.component';
import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { SignupComponent } from './signup/signup.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AuthServiceMail } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthServiceMail, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['articles']);
    }
    return true;
  }
}


const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full'},
  { path: 'article/:key', component: ArticleComponent},
  { path: 'articles', component: ArticleOverviewComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'create', component: NewArticleComponent, canActivate: [LoginActivate]},
  { path: 'user', component: UserComponent, canActivate: [LoginActivate]},
  { path: 'impressum', component: ImpressumComponent},
  { path: '404', component: NotFoundComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


