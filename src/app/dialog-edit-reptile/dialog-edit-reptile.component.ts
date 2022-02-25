import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Reptile} from "../data/reptile";
import {Breeder} from "../data/breeder";
import {BreederService} from "../breeder.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-edit-reptile',
  templateUrl: './dialog-edit-reptile.component.html',
  styleUrls: ['./dialog-edit-reptile.component.css']
})
export class DialogEditReptileComponent implements OnInit {

  orderControl = new FormControl('', Validators.required);
  nameControl = new FormControl('', Validators.required);
  typeControl = new FormControl('', Validators.required);

  reptiles: Reptile[] = [];
  breeders: Breeder[] = [];

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
    @Inject(MAT_DIALOG_DATA) public data: Reptile,
    private breederService: BreederService) {
  }

  ngOnInit(): void {
    this.getBreeders()
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
      for (let i = 0; i < breeders.length; i++) {
        if (breeders[i].id === this.data.breeder.id) {
          this.data.breeder = breeders[i];
        }
      }
    })
  }
}
