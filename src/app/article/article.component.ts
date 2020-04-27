import { AuthServiceMail } from './../services/auth.service';
import { SelectionService } from './../services/selection.service';
import { Category, Subcategory } from './../types/category.model';
import { categories, subcategories } from './../configs/data-config';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Article } from '../types/article.model';
import { Seller, User } from '../types/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { pictureUrl } from '../configs/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat: any;
  lng: any;
  article: Article = null;
  user: User;
  seller: Seller;
  currentPictureUrl: string;
  currentPictureId: string;
  coordinates: any;
  mapOptions: any;
  marker: any;

  category: Category;
  subcategory: Subcategory;

  mailForm = new FormGroup({
    message: new FormControl('', Validators.required),
    sender: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private route: ActivatedRoute,
    private authServiceMail: AuthServiceMail,
    private articleService: ArticleService,
    private selectionService: SelectionService,
    private router: Router
    ) { }

  ngOnInit() {
    this.seller = this.authServiceMail.seller;
    this.mailForm.setValue({
      message: '',
      sender: this.seller.email,
   });
    this.user = this.authServiceMail.user;
    this.route.params.subscribe(params => {
      const key = params.key;
      this.articleService.getArticle(key).subscribe(article => {
        if (article === undefined) {
          this.router.navigateByUrl('404');
          return;
        }
        this.article = article;
        this.currentPictureUrl = this.getPictureUrl(article.pictureIds[0]);
        this.currentPictureId = article.pictureIds[0];
        this.getCategory(article);
      }
      );
    });
  }

  ngAfterViewInit() {
    this.lat = this.article.location.coordinates[0];
    this.lng = this.article.location.coordinates[1];

    this.coordinates = new google.maps.LatLng(this.lat, this.lng);

    this.mapOptions  = {
      center: this.coordinates,
      zoom: 8
    };

    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });

    this.mapInitializer();
  }

  onSubmit() {
    this.articleService.sendMessage(this.article.sellerMail, this.mailForm.value.sender, this.mailForm.value.message);
  }

  getCategory(article: Article) {
    let index = categories.findIndex(c => c.id === article.category);
    this.category = categories[index];

    index = subcategories.findIndex(s => (s.category === article.category && s.id === article.subcategory));
    this.subcategory = subcategories[index];
  }

  getLocations(locations: string[]): string {
      let location = locations.toString();
      location = location.replace(',', ', ');
      return location;
  }

  getPrice(article: Article): string {
    return this.selectionService.getPrice(article);
  }

  getPictureUrl(pictureId: string): string {
    return pictureUrl + pictureId;
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  changeCurrentPicture(index: number) {
    this.currentPictureUrl = this.getPictureUrl(this.article.pictureIds[index]);
    this.currentPictureId = this.article.pictureIds[index];
  }

  // onBookmark() {
  //   this.articleService.bookmarkArticle(this.article.id, "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkMjM0OTg4ZTNhYWU2N2FmYmMwMmNiMWM0MTQwYjNjZjk2ODJjYWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjI1Njg0OTI4MjQ1LXQ3aGU2aHVxM2hiczlmdGQ0NWFyZDVwY2E0NmplZ3NmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjI1Njg0OTI4MjQ1LXQ3aGU2aHVxM2hiczlmdGQ0NWFyZDVwY2E0NmplZ3NmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA5MTU2NzcwNTc1NzgxNjIwNzY3IiwiZW1haWwiOiJzbmFja2Vyc2F1QGZyZWVuZXQuZGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9mT0FOWGNOUzlSUGdfdnFNWWNhSmciLCJpYXQiOjE1NzgzMzE1MzEsImV4cCI6MTU3ODMzNTEzMX0.o_LbEb6LqpTqFYRYL7I6EZkMIiiJicXxFKijOecEbtxiVPtFMiFxn4VooayeIAdGB3zMXMpSfeEdxv6p2G9pbPZB9htFLE7c9sn_C-oIIsSnukgNoOImcsPxOQtHYRKO-qOtpB3I25gjPfBzgGbqcc9lqkaoZow2Bo24r63FSHyT0RSnmz-hSn9ZHQ12gWE9AKf4jNjvmVoUBCnr2c8Cu0zjf7Flo8U6mVHecfN_GX4awC4g46IDXcbsk4sl4jVswLJefrq5kyQ5958fhvLMdlwiJfxrm6c7rOo62jA6--8imZAa8WI9L9W1Jdyou__Dry1s23DmDSfrpMcAoHslbw").subscribe(result => {
  //     console.log(result);
  //   });
  // }

  addBookmark(articleId: number) {
    this.articleService.addBookmarkArticle(articleId, this.seller.id);
  }

  deleteBookmark(articleId: number) {
    this.articleService.deleteBookmarkArticle(articleId, this.seller.id);
  }
}
