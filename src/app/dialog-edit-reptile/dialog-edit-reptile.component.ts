import {Component, Inject, OnInit} from '@angular/core';
import {Reptile} from "../data/reptile";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Breeder} from "../data/breeder";
import {BreederService} from "../breeder.service";

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
  breeders: Breeder[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogEditReptileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reptile,
    private breederService: BreederService) {
  }

  ngOnInit(): void {
    this.getBreeders()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getBreeders(): void{
    this.breederService.getBreeders().subscribe(breeders => {
      this.breeders = breeders;
      // Breeder wird richtig übergeben, muss das aber trotzdem nochmal machen, damit der
      // Züchter auch vorausgewählt im Bearbeiten-Dialog ist ?!?!?!
      for(let i = 0; i<breeders.length; i++){
        if(breeders[i].id === this.data.breeder.id){
          this.data.breeder = breeders[i];
        }
      }
    })
  }

}
