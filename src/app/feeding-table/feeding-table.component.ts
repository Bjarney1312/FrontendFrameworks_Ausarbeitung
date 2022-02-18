import {AfterViewInit, Component, ViewChild, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Feeding} from "../data/feeding";
import {Reptile} from "../data/reptile";

@Component({
  selector: 'app-feeding-table',
  templateUrl: './feeding-table.component.html',
  styleUrls: ['./feeding-table.component.css']
})
export class FeedingTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() reptile!: Reptile;

  displayedColumns: string[] = ['date', 'type', 'weight'];
  dataSource!:MatTableDataSource<Feeding>

  constructor() { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Feeding>(this.reptile.feedings);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource<Feeding>(this.reptile.feedings);
    // this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.dataSource = new MatTableDataSource<Feeding>(this.reptile.feedings);
    // this.dataSource.paginator = this.paginator;
  }
}
