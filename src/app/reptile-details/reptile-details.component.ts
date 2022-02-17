import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ReptileService} from "../reptile.service";
import {Reptile} from "../data/reptile";

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
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getReptile();
  }

  getReptile(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
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
