import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ReptileService } from '../reptile.service';
import {Reptile} from "../reptile";

@Component({
  selector: 'app-reptile-dashboard',
  templateUrl: './reptile-dashboard.component.html',
  styleUrls: ['./reptile-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReptileDashboardComponent implements OnInit {

  reptiles: Reptile[] = [];

  constructor(private reptileService: ReptileService) { }

  ngOnInit(): void {
    this.getReptiles();
  }

  getReptiles(): void {
    this.reptileService.getReptiles()
      .subscribe(reptiles => this.reptiles = reptiles);
  }
}
