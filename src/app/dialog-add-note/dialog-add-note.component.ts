import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {v4 as uuidv4} from "uuid";
import {Note} from "../data/note";

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-add-note.component.html',
  styleUrls: ['./dialog-add-note.component.css']
})
export class DialogAddNoteComponent implements OnInit {

  initialDate: Date = new Date()
  noteControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<DialogAddNoteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Note,
  ) {}

  ngOnInit(): void {
    this.data.id = uuidv4();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
