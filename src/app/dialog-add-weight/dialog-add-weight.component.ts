import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Weight} from "../data/weight";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-dialog-add-weight',
  templateUrl: './dialog-add-weight.component.html',
  styleUrls: ['./dialog-add-weight.component.css']
})
export class DialogAddWeightComponent implements OnInit {

  numberControl = new FormControl('', Validators.min(0));

  initialDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<DialogAddWeightComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Weight) {
  }

  ngOnInit(): void {
    this.data.id = uuidv4();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
