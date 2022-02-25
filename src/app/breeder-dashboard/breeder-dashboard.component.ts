import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Breeder} from "../data/breeder";
import {ReptileService} from "../reptile.service";
import {BreederService} from "../breeder.service";
import {DialogDeleteBreederComponent} from "../dialog-delete-breeder/dialog-delete-breeder.component";
import {DialogAddBreederComponent} from "../dialog-add-breeder/dialog-add-breeder.component";
import {DialogEditBreederComponent} from "../dialog-edit-breeder/dialog-edit-breeder.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-breeder-dashboard',
  templateUrl: './breeder-dashboard.component.html',
  styleUrls: ['./breeder-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BreederDashboardComponent implements OnInit {

  breeders: Breeder[] = [];
  breeder!: Breeder;

  constructor(private breederService: BreederService,
              private reptileService: ReptileService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getBreedersWithoutUnbekannt();
  }

  /*---------------------------------------------------------------------------------------------------
                                         Funktionen
  -----------------------------------------------------------------------------------------------------*/

  getBreedersWithoutUnbekannt(): void {
    this.breederService.getBreeders()
      .subscribe(breeders => {
        this.breeders = breeders;
        this.breeders.splice(0, 1);
      });
  }

  updateBreederLocalStorage(): void {
    this.breederService.getBreeders().subscribe(breeders => {
      localStorage.setItem('breeders', JSON.stringify(breeders))
    });
  }

  openAddBreederDialog(): void {
    const dialogRef = this.dialog.open(DialogAddBreederComponent, {
      width: '560px',
      data: {breeder: {}}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.breeder = result;
        this.breederService.addBreeder(result as Breeder)
          .subscribe(breeder => {
            this.breeders.push(breeder);
            this.updateBreederLocalStorage();
          });
        this.getBreedersWithoutUnbekannt();
      }
    });
  }

  openDeleteBreederDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogDeleteBreederComponent, {
      width: '300px',
      data: {}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.breederService.deleteBreeder(id).subscribe();
        this.getBreedersWithoutUnbekannt()
        this.updateBreederLocalStorage();
      }
    });
  }

  openEditBreederDialog(id: string): void {
    this.breederService.getBreeder(id)
      .subscribe(breeder => {
        this.breeder = breeder;

        const dialogRef = this.dialog.open(DialogEditBreederComponent, {
          width: '560px',
          data: {
            companyName: this.breeder.companyName,
            firstName: this.breeder.firstName,
            lastName: this.breeder.lastName,
            street: this.breeder.street,
            postal: this.breeder.postal,
            place: this.breeder.place,
            country: this.breeder.country,
            email: this.breeder.email,
            phone: this.breeder.phone
          }, disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined && this.breeder !== undefined) {
            this.breeder.companyName = result.companyName;
            this.breeder.firstName = result.firstName;
            this.breeder.lastName = result.lastName;
            this.breeder.street = result.street;
            this.breeder.postal = result.postal;
            this.breeder.place = result.place;
            this.breeder.email = result.email;
            this.breeder.phone = result.phone;
            this.breederService.updateBreeder(this.breeder).subscribe(result => {
              this.reptileService.getReptiles()
                .subscribe(reptiles => {
                  for (let i = 0; i < reptiles.length; i++) {
                    if (reptiles[i].breeder.id === this.breeder.id) {
                      reptiles[i].breeder = this.breeder;
                      this.reptileService.updateReptile(reptiles[i]).subscribe()
                      this.reptileService.getReptiles().subscribe(reptiles => {
                        localStorage.setItem('reptiles', JSON.stringify(reptiles))
                      });
                    }
                  }
                })
            });
            this.getBreedersWithoutUnbekannt();
            this.updateBreederLocalStorage();
          }
        });
      });
  }
}
