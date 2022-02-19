import {Component, Inject, OnInit} from '@angular/core';
import {Reptile} from "../data/reptile";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-dialog-edit-reptile',
  templateUrl: './dialog-edit-reptile.component.html',
  styleUrls: ['./dialog-edit-reptile.component.css']
})
export class DialogEditReptileComponent implements OnInit {

  reptiles: Reptile[] = [];
  orderControl = new FormControl('', Validators.required);
  nameControl = new FormControl('', Validators.required);
  typeControl = new FormControl('', Validators.required);
  orders: String[] = [
    'Schlange',
    'Echse',
    'Krokodil',
    'Schildkröte',
    'Amphibie',
    'Gliederfüßer',
    'Sonstiges'
  ]
  genders: String[] = [
    'Männlich',
    'Weiblich',
    'Unbekannt'
  ]

  constructor(
    public dialogRef: MatDialogRef<DialogEditReptileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reptile) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
