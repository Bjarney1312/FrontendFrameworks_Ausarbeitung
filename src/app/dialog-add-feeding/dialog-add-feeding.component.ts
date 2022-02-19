import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Feeding} from "../data/feeding";
import {v4 as uuidv4} from 'uuid';
import {FormControl, Validators} from "@angular/forms";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};




@Component({
  selector: 'app-dialog-add-feeding',
  templateUrl: './dialog-add-feeding.component.html',
  styleUrls: ['./dialog-add-feeding.component.css'],
})
export class DialogAddFeedingComponent implements OnInit {
  initialDate: Date = new Date()
  numberControl = new FormControl('', Validators.min(0));

  constructor(public dialogRef: MatDialogRef<DialogAddFeedingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Feeding,
  ) {}

  ngOnInit(): void {
    this.data.id = uuidv4();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
