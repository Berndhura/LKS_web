import { firebaseImageUrl } from './../configs/config';
import { aboutUs } from './../configs/data-config';
import { Component, OnInit } from '@angular/core';
import { AboutUs } from '../types/about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutUs: AboutUs[] = aboutUs;
  firebaseImageUrl: string = firebaseImageUrl;

  constructor() { }

  ngOnInit() {
  }

}
