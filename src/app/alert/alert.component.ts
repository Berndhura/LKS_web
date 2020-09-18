import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  dataArray: string[];

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {
    this.dataArray = this.data.split(' ');

    setTimeout(() => {
      this.dialogRef.close();
    }, 5000);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
