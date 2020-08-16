import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-map',
  templateUrl: './dialog-map.component.html',
  styleUrls: ['./dialog-map.component.scss']
})
export class DialogMapComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
