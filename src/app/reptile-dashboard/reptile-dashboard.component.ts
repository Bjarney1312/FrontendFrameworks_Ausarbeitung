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

  constructor(private reptileService: ReptileService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getReptiles();
  }

  getReptiles(): void {
    this.reptileService.getReptiles()
      .subscribe(reptiles => this.reptiles = reptiles);
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
      width: '250px',
      data: {
        reptile: {
          id: 0,
          name: 'Hubert',
          geburtsdatum: '',
          ordnung: '',
          art: '',
          morph: ''
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('TEST:' + result.name);
      this.reptile = result;
      console.log('TEST this Reptile:' + this.reptile.name);
      this.add(result);
      this.getReptiles();
    });
  }
}
