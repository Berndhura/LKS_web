import { Seller } from './../types/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentSeller: Seller;

  constructor() { }

  ngOnInit() {
  }

}
