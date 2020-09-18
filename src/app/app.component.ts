import { SelectionService } from './services/selection.service';
import { Component, OnInit, DoCheck, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AuthServiceMail } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('mainDiv', {static: false}) mainDiv: ElementRef;

  mainHeight: any;
  mainContainer: any;

  constructor(
    public authService: AuthServiceMail,
    public selectionService: SelectionService) {}

  ngOnInit() {
    this.authService.checkLocalSessionToken();
    this.onResize();
    this.selectionService.pageChangeSubject.subscribe(() => {
      this.scrollToTop();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mainHeight = window.innerHeight - 80;
  }

  scrollToTop(): void {

    this.mainContainer = this.mainDiv.nativeElement;
    this.mainContainer.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}
