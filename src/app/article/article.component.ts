import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Article } from '../types/article';
import { SellerInfo } from '../types/seller';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat: any;
  lng: any;
  article: Article = null;
  seller: SellerInfo = null;
  coordinates: any;
  mapOptions: any;
  marker: any;

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
        this.articleService.getUserInfo(article.userId, 'token??').subscribe(seller => {
          this.seller = seller;
          console.log(this.seller);
        });
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

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  onBookmark() {
    this.articleService.bookmarkArticle(this.article.id, "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkMjM0OTg4ZTNhYWU2N2FmYmMwMmNiMWM0MTQwYjNjZjk2ODJjYWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjI1Njg0OTI4MjQ1LXQ3aGU2aHVxM2hiczlmdGQ0NWFyZDVwY2E0NmplZ3NmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjI1Njg0OTI4MjQ1LXQ3aGU2aHVxM2hiczlmdGQ0NWFyZDVwY2E0NmplZ3NmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA5MTU2NzcwNTc1NzgxNjIwNzY3IiwiZW1haWwiOiJzbmFja2Vyc2F1QGZyZWVuZXQuZGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Il9mT0FOWGNOUzlSUGdfdnFNWWNhSmciLCJpYXQiOjE1NzgzMzE1MzEsImV4cCI6MTU3ODMzNTEzMX0.o_LbEb6LqpTqFYRYL7I6EZkMIiiJicXxFKijOecEbtxiVPtFMiFxn4VooayeIAdGB3zMXMpSfeEdxv6p2G9pbPZB9htFLE7c9sn_C-oIIsSnukgNoOImcsPxOQtHYRKO-qOtpB3I25gjPfBzgGbqcc9lqkaoZow2Bo24r63FSHyT0RSnmz-hSn9ZHQ12gWE9AKf4jNjvmVoUBCnr2c8Cu0zjf7Flo8U6mVHecfN_GX4awC4g46IDXcbsk4sl4jVswLJefrq5kyQ5958fhvLMdlwiJfxrm6c7rOo62jA6--8imZAa8WI9L9W1Jdyou__Dry1s23DmDSfrpMcAoHslbw").subscribe(result => {
      console.log(result);
    });
  }
}
