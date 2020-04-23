import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onFileSelected(event) {
    console.log(event);
  }

  onSubmit(from: NgForm) {
    console.log(from);
  }

}
