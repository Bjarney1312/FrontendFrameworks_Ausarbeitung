import {AfterViewInit, Component, ViewChild, OnInit, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Feeding} from "../data/feeding";
import {FeedingService} from "../feeding.service";
import {Reptile} from "../data/reptile";

@Component({
  selector: 'app-feeding-table',
  templateUrl: './feeding-table.component.html',
  styleUrls: ['./feeding-table.component.css']
})
export class FeedingTableComponent implements OnInit {

  @Input() reptile!: Reptile;
  feedings: Feeding[] = [];

  displayedColumns: string[] = ['date', 'type', 'weight'];
  dataSource = new MatTableDataSource<Feeding>(this.feedings);

  constructor(private feedingService: FeedingService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getFeedings(this.reptile.id);
  }

  getFeedings(reptileid: number): void {
    this.feedingService.getFeedingsByReptile(reptileid)
      .subscribe(feedings => {
        this.feedings = feedings;
        this.dataSource = new MatTableDataSource<Feeding>(feedings);
        this.dataSource.paginator = this.paginator;
      });
  }
}
