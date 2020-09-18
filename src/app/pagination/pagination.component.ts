import { ArticleService } from './../services/article.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() position: number;
  @Input() count: number;
  @Input() sites: number;
  @Input() currentSite: number;
  @Output() pageChange = new EventEmitter<number>();

  timer: any;
  typingSites = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  changeSite() {
    if (this.currentSite > this.sites) {
      this.currentSite = this.sites;
    }
    if (this.currentSite.toString() === '0') {
      setTimeout(() => {
        this.currentSite = 1;
   }, 30);
    }

    clearTimeout(this.timer);
    this.typingSites = false;

    if (this.currentSite) {
      this.typingSites = true;
      this.timer = setTimeout(() => { this.triggerPageChange(); }, 2000);
    }
  }

  backSite() {
    clearTimeout(this.timer);
    this.currentSite = this.currentSite - 1;
    this.triggerPageChange();
  }

  forwardSite() {
    clearTimeout(this.timer);
    if (!this.currentSite) {
      this.currentSite = 1;
    } else {
      this.currentSite = this.currentSite + 1;
    }
    this.triggerPageChange();
  }

  triggerPageChange() {
    this.typingSites = false;
    this.pageChange.emit(this.currentSite);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
