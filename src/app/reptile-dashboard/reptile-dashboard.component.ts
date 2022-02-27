import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ReptileService} from '../reptile.service';
import {Reptile} from "../data/reptile";
import {Feeding} from "../data/feeding";
import {DialogAddReptileComponent} from "../dialog-add-reptile/dialog-add-reptile.component";
import {DialogAddFeedingComponent} from "../dialog-add-feeding/dialog-add-feeding.component";
import {DialogAddWeightComponent} from "../dialog-add-weight/dialog-add-weight.component";
import {DialogAddNoteComponent} from "../dialog-add-note/dialog-add-note.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-reptile-dashboard',
  templateUrl: './reptile-dashboard.component.html',
  styleUrls: ['./reptile-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReptileDashboardComponent implements OnInit {

  reptiles: Reptile[] = [];
  reptile!: Reptile;
  feeding!: Feeding;

  constructor(private reptileService: ReptileService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getReptiles()
  }

  /*---------------------------------------------------------------------------------------------------
                                           Funktionen
  -----------------------------------------------------------------------------------------------------*/

  getReptiles(): void {
    this.reptileService.getReptiles()
      .subscribe(reptiles => {
        this.reptiles = reptiles;
      });
  }

  updateReptileStorage(): void {
    this.reptileService.getReptiles().subscribe(reptiles => {
      localStorage.setItem('reptiles', JSON.stringify(reptiles))
    });
  }

  add(reptile: Reptile): void {
    if (!reptile) {
      return;
    }
    this.reptileService.addReptile(reptile as Reptile)
      .subscribe(reptile => {
        this.reptiles.push(reptile);
        localStorage.setItem('reptiles', JSON.stringify(this.reptiles));
      });
  }

  openAddReptileDialog(): void {
    const dialogRef = this.dialog.open(DialogAddReptileComponent, {
      width: '560px',
      data: {reptile: {}}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

        this.reptile = result;
        this.reptile.feedings = [];
        this.reptile.weight = [];
        this.reptile.notes = [];
        if (result.imageURL === undefined) {
          this.reptile.imageURL = 'https://icon-library.com/images/reptile-icon/reptile-icon-26.jpg'
        }
        this.add(this.reptile);
      }
    });
  }

  openAddFeedingDialog(reptileid: any): void {
    const dialogRef = this.dialog.open(DialogAddFeedingComponent, {
      width: '300px',
      data: {feeding: {}}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.date === undefined) {
          result.date = new Date().toLocaleDateString();
        } else {
          result.date = result.date.toLocaleDateString();
        }
        if (result.type === undefined) {
          result.type = '-';
        }
        if (result.weight === undefined) {
          result.weight = 0.0;
        }
        this.reptileService.getReptile(reptileid)
          .subscribe(reptile => {
            this.reptile = reptile;
            reptile.feedings.push(Object.assign({}, result));
            this.reptileService.updateReptile(reptile).subscribe();
            this.updateReptileStorage();
            this.getReptiles();
          })
      }
    });
  }

  openAddWeightDialog(reptileid: any): void {
    const dialogRef = this.dialog.open(DialogAddWeightComponent, {
      width: '300px',
      data: {weight: {}}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.date === undefined) {
          result.date = new Date().toLocaleDateString();
        } else {
          result.date = result.date.toLocaleDateString();
        }
        if (result.weight === undefined) {
          result.weight = 0.0;
        }
        this.reptileService.getReptile(reptileid)
          .subscribe(reptile => {
            reptile.weight.push(Object.assign({}, result));
            this.reptileService.updateReptile(reptile).subscribe();
            this.updateReptileStorage();
            this.getReptiles();
          })
      }
    });
  }

  openAddNoteDialog(reptileid: any): void {
    const dialogRef = this.dialog.open(DialogAddNoteComponent, {
      width: '300px',
      data: {weight: {}}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.date === undefined) {
          result.date = new Date().toLocaleDateString();
        } else {
          result.date = result.date.toLocaleDateString();
        }
        if (result.note === undefined) {
          result.note = 'Kein Eintrag';
        }
        this.reptileService.getReptile(reptileid)
          .subscribe(reptile => {
            reptile.notes.push(Object.assign({}, result));
            this.reptileService.updateReptile(reptile).subscribe();
            this.updateReptileStorage();
            this.getReptiles();
          })
      }
    });
  }
}
