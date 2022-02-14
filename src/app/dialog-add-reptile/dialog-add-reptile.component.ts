import {Component, Inject, OnInit} from '@angular/core';
import {Reptile} from "../reptile";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-reptile',
  templateUrl: './dialog-add-reptile.component.html',
  styleUrls: ['./dialog-add-reptile.component.css']
})
export class DialogAddReptileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAddReptileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reptile,
  ) {}

  ngOnInit(): void {
    this.data.id = 7;
    this.data.ordnung = 'Schlange';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
