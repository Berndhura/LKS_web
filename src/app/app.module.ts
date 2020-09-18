import { AngularFireStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleOverviewComponent } from './article-overview/article-overview.component';
import { AboutComponent } from './about/about.component';
import { ArticleComponent } from './article/article.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider} from 'ng4-social-login';
import { NewArticleComponent } from './new-article/new-article.component';
import { MaterialModule } from './material.module';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AuthServiceMail } from './services/auth.service';
import { environment } from '../environments/environment';
import { ImpressumComponent } from './impressum/impressum.component';
import { UserComponent } from './user/user.component';
import { ProductSelectComponent } from './product-select/product-select.component';
import { HeaderComponent } from './header/header.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { SubcatSelectComponent } from './subcat-select/subcat-select.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { AlertComponent } from './alert/alert.component';
import { TokenInterceptor } from './util/token.interceptor';
import { DialogMapComponent } from './dialog-map/dialog-map.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingComponent } from './loading/loading.component';


const config = new AuthServiceConfig([
{
   id: FacebookLoginProvider.PROVIDER_ID,
   provider: new FacebookLoginProvider('535532649933816')
},
{
   id: GoogleLoginProvider.PROVIDER_ID,
   provider: new GoogleLoginProvider('225684928245-21lot3bitst9q7te84fq0kcc1bel3pl7.apps.googleusercontent.com')
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
      ArticleOverviewComponent,
      AboutComponent,
      ArticleComponent,
      NotFoundComponent,
      LoginComponent,
      NewArticleComponent,
      SignupComponent,
      ImpressumComponent,
      UserComponent,
      ProductSelectComponent,
      HeaderComponent,
      ArticleListComponent,
      SubcatSelectComponent,
      LocationMapComponent,
      DialogConfirmComponent,
      AlertComponent,
      DialogMapComponent,
      PaginationComponent,
      LoadingComponent
   ],
   entryComponents: [
      DialogConfirmComponent,
      DialogMapComponent,
      AlertComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SocialLoginModule,
      BrowserAnimationsModule,
      MaterialModule,
      FlexLayoutModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
      ReactiveFormsModule
   ],
   providers: [
      {
         provide: AuthServiceConfig,
         useFactory: provideConfig
      },
      AuthServiceMail,
      AngularFireStorage,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: TokenInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
