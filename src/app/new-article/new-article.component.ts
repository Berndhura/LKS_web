import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSubmit(from: NgForm) {
    console.log(from);
  }

}