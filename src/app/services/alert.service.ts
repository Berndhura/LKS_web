import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public dialog: MatDialog) { }

  openAlert(message, status) {

    const statusClass = status + '-modalbox';
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
      data: message,
      panelClass: statusClass,
      backdropClass: 'backdropBackground'
    });
  }
}
