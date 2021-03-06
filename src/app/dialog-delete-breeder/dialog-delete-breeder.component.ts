import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-delete-breeder',
  templateUrl: './dialog-delete-breeder.component.html',
  styleUrls: ['./dialog-delete-breeder.component.css']
})
export class DialogDeleteBreederComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteBreederComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
