import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {Feeding} from "../data/feeding";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-feeding',
  templateUrl: './dialog-add-feeding.component.html',
  styleUrls: ['./dialog-add-feeding.component.css'],
})
export class DialogAddFeedingComponent implements OnInit {

  numberControl = new FormControl('', Validators.min(0));

  initialDate: Date = new Date()


  constructor(public dialogRef: MatDialogRef<DialogAddFeedingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Feeding) {
  }

  ngOnInit(): void {
    this.data.id = uuidv4();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
