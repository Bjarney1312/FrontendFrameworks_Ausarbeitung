import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from "rxjs";
import {Breeder} from "../data/breeder";
import {BreederService} from "../breeder.service";
import {DialogEditBreederComponent} from "../dialog-edit-breeder/dialog-edit-breeder.component";
import {MatDialog} from "@angular/material/dialog";
import {ReptileService} from "../reptile.service";

@Component({
  selector: 'app-breeder-search',
  templateUrl: './breeder-search.component.html',
  styleUrls: ['./breeder-search.component.css']
})
export class BreederSearchComponent implements OnInit {

  breeders$!: Observable<Breeder[]>;
  private searchTerms = new Subject<string>();
  breeder!: Breeder;
  breeders: Breeder[] = [];

  constructor(private breederService: BreederService,
              private reptileService: ReptileService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.breeders$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.breederService.searchBreeder(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getBreedersWithoutUnbekannt(): void {
    this.breederService.getBreeders()
      .subscribe(breeders => {
        this.breeders = breeders;
        this.breeders.splice(0,1);
      });
  }

  openEditBreederDialog(id: string): void {
    this.breederService.getBreeder(id)
      .subscribe(breeder => {
        this.breeder = breeder;

        const dialogRef = this.dialog.open(DialogEditBreederComponent, {
          width: '300px',
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
          }, disableClose:true
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result !== undefined && this.breeder !== undefined){
            this.breeder.companyName = result.companyName;
            this.breeder.firstName = result.firstName;
            this.breeder.lastName = result.lastName;
            this.breeder.street = result.street;
            this.breeder.postal = result.postal;
            this.breeder.place = result.place;
            this.breeder.email = result.email;
            this.breeder.phone = result.phone;
            this.breederService.updateBreeder(this.breeder).subscribe(event => {
              this.reptileService.getReptiles()
                .subscribe(reptiles =>{
                  for(let i = 0; i<reptiles.length; i++){
                    if(reptiles[i].breeder.id === this.breeder.id){
                      reptiles[i].breeder = this.breeder;
                      this.reptileService.updateReptile(reptiles[i]).subscribe()
                    }
                  }
                })
            });
            this.getBreedersWithoutUnbekannt();
          }
        });
      });
  }
}
