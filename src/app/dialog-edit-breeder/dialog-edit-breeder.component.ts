import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Breeder} from "../data/breeder";

@Component({
  selector: 'app-dialog-edit-breeder',
  templateUrl: './dialog-edit-breeder.component.html',
  styleUrls: ['./dialog-edit-breeder.component.css']
})
export class DialogEditBreederComponent implements OnInit {

  initialDate: Date = new Date()
  numberControl = new FormControl('', Validators.min(0));

  constructor(public dialogRef: MatDialogRef<DialogEditBreederComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Breeder) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
