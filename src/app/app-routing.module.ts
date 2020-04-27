import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { SignupComponent } from './signup/signup.component';
import { ImpressumComponent } from './impressum/impressum.component';


const routes: Routes = [
  { path: 'articles', component: ArticleOverviewComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'create', component: NewArticleComponent},
  { path: 'user', component: UserComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', component: ArticleOverviewComponent},
  { path: ':key', component: ArticleComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
