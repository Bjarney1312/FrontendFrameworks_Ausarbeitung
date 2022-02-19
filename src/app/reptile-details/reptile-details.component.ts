import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ReptileService} from "../reptile.service";
import {Reptile} from "../data/reptile";
import {DialogAddFeedingComponent} from "../dialog-add-feeding/dialog-add-feeding.component";
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
  ) { }

  ngOnInit(): void {
    this.getReptile();
  }

  getReptile(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.reptileService.getReptile(id)
      .subscribe(reptile => this.reptile = reptile);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.reptile) {
      this.reptileService.updateReptile(this.reptile)
        .subscribe(() => this.goBack());
    }
  }
}
