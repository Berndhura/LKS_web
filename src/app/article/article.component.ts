import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Article } from '../article';
import { SellerInfo } from '../seller';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 12.086546299999995;
  lng = 13.935242;
  article: Article = null;
  seller: SellerInfo = null;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  ngAfterViewInit() {
    this.lat = 54.12;
    this.lng = 13.12;
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
  }

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
}
