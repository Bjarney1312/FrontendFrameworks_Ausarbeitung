import {Component, Inject, OnInit} from '@angular/core';
import {Reptile} from "../data/reptile";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-dialog-add-reptile',
  templateUrl: './dialog-add-reptile.component.html',
  styleUrls: ['./dialog-add-reptile.component.css']
})
export class DialogAddReptileComponent implements OnInit {

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
    public dialogRef: MatDialogRef<DialogAddReptileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reptile,
  ) {}

  ngOnInit(): void {
    this.data.id = uuidv4();
    this.data.geschlecht = 'Unbekannt';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
