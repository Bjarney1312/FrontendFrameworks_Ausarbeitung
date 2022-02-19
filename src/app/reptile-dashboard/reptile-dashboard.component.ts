import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ReptileService } from '../reptile.service';
import {Reptile} from "../data/reptile";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddReptileComponent} from "../dialog-add-reptile/dialog-add-reptile.component";
import {DialogAddFeedingComponent} from "../dialog-add-feeding/dialog-add-feeding.component";
import {Feeding} from "../data/feeding";

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

  constructor(private reptileService: ReptileService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getReptiles();

  }

  getReptiles(): void {
    this.reptileService.getReptiles()
      .subscribe(reptiles => {
        this.reptiles = reptiles;
      });
  }

  add(reptile: Reptile): void {
    if (!reptile) {
      return;
    }
    this.reptileService.addReptile(reptile as Reptile)
      .subscribe(reptile => {
        this.reptiles.push(reptile);
      });
  }

  openAddReptileDialog(): void {
    const dialogRef = this.dialog.open(DialogAddReptileComponent, {
      width: '300px',
      data: {
        reptile: {
          id: 0,
          name: '',
          geburtsdatum: '',
          geschlecht: '',
          ordnung: '',
          art: '',
          morph: ''
        },
      }, disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.reptile = result;
        this.add(this.reptile);
        this.getReptiles();
      }
    });
  }

  openAddFeedingDialog(reptileid : any): void {
    const dialogRef = this.dialog.open(DialogAddFeedingComponent, {
      width: '300px',
      data: {
        feeding: {
          id: 0,
          date: new Date(),
          type: '',
          weight: 0,
        },
      }, disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(result.date === undefined){
          result.date = new Date().toLocaleDateString();
        }
        else{
          result.date = result.date.toDate().toLocaleDateString()
        }
        if(result.type === undefined){
          result.type = '-';
        }

        if(result.weight === undefined){
          result.weight = 0.0;
        }
        this.reptileService.getReptile(reptileid)
          .subscribe(reptile => {
            reptile.feedings.push(Object.assign({}, result))
            this.reptileService.updateReptile(reptile).subscribe();
          })
      }
    });
  }


}
