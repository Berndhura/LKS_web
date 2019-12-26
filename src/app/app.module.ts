import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from 'ng4-social-login';
import { NewArticleComponent } from './new-article/new-article.component';

const config = new AuthServiceConfig([
{
   id: FacebookLoginProvider.PROVIDER_ID,
   provider: new FacebookLoginProvider('535532649933816')
}
], false);

export function provideConfig() {
   return config;
}

@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      FooterComponent,
      ArticleListComponent,
      AboutComponent,
      ArticleComponent,
      NotFoundComponent,
      LoginComponent,
      NewArticleComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SocialLoginModule
   ],
   providers: [
      {provide: AuthServiceConfig, useFactory: provideConfig}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
