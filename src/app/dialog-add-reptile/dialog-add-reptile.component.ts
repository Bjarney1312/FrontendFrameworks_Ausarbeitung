import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {Reptile} from "../data/reptile";
import {Breeder} from "../data/breeder";
import {BreederService} from "../breeder.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-reptile',
  templateUrl: './dialog-add-reptile.component.html',
  styleUrls: ['./dialog-add-reptile.component.css']
})
export class DialogAddReptileComponent implements OnInit {

  orderControl = new FormControl('', Validators.required);
  nameControl = new FormControl('', Validators.required);
  typeControl = new FormControl('', Validators.required);

  reptiles: Reptile[] = [];
  breeders!: Breeder[];

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
    private breederService: BreederService) {
  }

  ngOnInit(): void {
    this.getBreeders();
    this.data.id = uuidv4();
    this.data.gender = 'Unbekannt';
  }

  /*---------------------------------------------------------------------------------------------------
                                         Funktionen
  -----------------------------------------------------------------------------------------------------*/

  onNoClick(): void {
    this.dialogRef.close();
  }

  getBreeders(): void {
    this.breederService.getBreeders().subscribe(breeders => {
      this.breeders = breeders;
      this.data.breeder = breeders[0];
    })
  }
}
