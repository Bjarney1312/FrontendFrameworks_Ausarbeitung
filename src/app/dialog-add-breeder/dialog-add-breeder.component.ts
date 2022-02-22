import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {v4 as uuidv4} from "uuid";
import {Breeder} from "../data/breeder";

@Component({
  selector: 'app-dialog-add-breeder',
  templateUrl: './dialog-add-breeder.component.html',
  styleUrls: ['./dialog-add-breeder.component.css']
})
export class DialogAddBreederComponent implements OnInit {

  breeders: Breeder[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAddBreederComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Breeder,
  ) {}

  ngOnInit(): void {
    this.data.id = uuidv4();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
