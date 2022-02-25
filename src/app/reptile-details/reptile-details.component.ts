import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ReptileService} from "../reptile.service";
import {Reptile} from "../data/reptile";
import {DialogEditReptileComponent} from "../dialog-edit-reptile/dialog-edit-reptile.component";
import {DialogDeleteReptileComponent} from "../dialog-delete-reptile/dialog-delete-reptile.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-reptile-details',
  templateUrl: './reptile-details.component.html',
  styleUrls: ['./reptile-details.component.css']
})
export class ReptileDetailsComponent implements OnInit {

  @Input() reptile?: Reptile;

  constructor(
    private route: ActivatedRoute,
    private reptileService: ReptileService,
    private location: Location,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getReptile();
  }

  /*---------------------------------------------------------------------------------------------------
                                             Funktionen
  -----------------------------------------------------------------------------------------------------*/

  getReptile(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.reptileService.getReptile(id)
      .subscribe(reptile => {
        this.reptile = reptile;
      });
  }

  updateReptileStorage(): void {
    this.reptileService.getReptiles().subscribe(reptiles => {
      localStorage.setItem('reptiles', JSON.stringify(reptiles))
    });
  }

  openEditReptileDialog(): void {
    const dialogRef = this.dialog.open(DialogEditReptileComponent, {
      width: '560px',
      data: {
        name: this.reptile?.name,
        geburtsdatum: this.reptile?.geburtsdatum,
        geschlecht: this.reptile?.geschlecht,
        ordnung: this.reptile?.ordnung,
        art: this.reptile?.art,
        morph: this.reptile?.morph,
        breeder: this.reptile?.breeder,
        imageURL: this.reptile?.imageURL
      }, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && this.reptile !== undefined) {
        this.reptile.name = result.name;
        this.reptile.geburtsdatum = result.geburtsdatum;
        this.reptile.geschlecht = result.geschlecht;
        this.reptile.ordnung = result.ordnung;
        this.reptile.art = result.art;
        this.reptile.morph = result.morph;
        this.reptile.breeder = result.breeder;
        this.reptile.imageURL = result.imageURL;

        this.reptileService.updateReptile(this.reptile).subscribe();
        this.updateReptileStorage();
      }
    });
  }

  openDeleteDialog(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    const dialogRef = this.dialog.open(DialogDeleteReptileComponent, {
      width: '300px',
      data: {}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.reptileService.deleteReptile(id).subscribe();
        this.updateReptileStorage();
        this.location.back()
      }
    });
  }
}
