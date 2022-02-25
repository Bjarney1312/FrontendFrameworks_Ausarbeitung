import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-delete-reptile',
  templateUrl: './dialog-delete-reptile.component.html',
  styleUrls: ['./dialog-delete-reptile.component.css']
})
export class DialogDeleteReptileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteReptileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
