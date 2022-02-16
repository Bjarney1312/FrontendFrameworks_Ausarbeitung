import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ReptileService } from '../reptile.service';
import {Reptile} from "../reptile";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddReptileComponent} from "../dialog-add-reptile/dialog-add-reptile.component";

@Component({
  selector: 'app-reptile-dashboard',
  templateUrl: './reptile-dashboard.component.html',
  styleUrls: ['./reptile-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReptileDashboardComponent implements OnInit {

  reptiles: Reptile[] = [];
  reptile!: Reptile;
  lastid: number = 0;

  constructor(private reptileService: ReptileService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getReptiles();
  }

  getReptiles(): void {
    this.reptileService.getReptiles()
      .subscribe(reptiles => {
        this.reptiles = reptiles;
        this.lastid = reptiles.length;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddReptileComponent, {
      width: '300px',
      data: {
        reptile: {
          id: 0,
          name: '',
          geburtsdatum: '',
          ordnung: '',
          art: '',
          morph: ''
        },
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('TEST:' + result.name);
      this.reptile = result;
      this.reptile.id = this.lastid + 1;
      console.log('Neues Tier mit ID: ' + result.id);
      this.lastid = this.lastid+1;
      this.add(this.reptile);
      this.getReptiles();
    });
  }
}