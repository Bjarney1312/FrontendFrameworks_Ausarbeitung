import {Component, ViewChild, OnInit, Input, AfterViewInit} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {Feeding} from "../data/feeding";
import {Reptile} from "../data/reptile";
import {ReptileService} from "../reptile.service";
import {DialogAddFeedingComponent} from "../dialog-add-feeding/dialog-add-feeding.component";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-feeding-table',
  templateUrl: './feeding-table.component.html',
  styleUrls: ['./feeding-table.component.css']
})
export class FeedingTableComponent implements OnInit, AfterViewInit {

  @Input() reptile!: Reptile;

  @ViewChild('myTable') myTable!: MatTable<Feeding>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: any[] = ['select', 'date', 'type', 'weight'];
  dataSource!: MatTableDataSource<Feeding>
  selection = new SelectionModel<Feeding>(true, []);

  constructor(public dialog: MatDialog,
              private reptileService: ReptileService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Feeding>(this.reptile.feedings);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  /*---------------------------------------------------------------------------------------------------
                                          Funktionen
  -----------------------------------------------------------------------------------------------------*/

  updateReptileStorage(): void {
    this.reptileService.getReptiles().subscribe(reptiles => {
      localStorage.setItem('reptiles', JSON.stringify(reptiles))
    });
  }

  openAddFeedingDialog(reptileid: any): void {
    const dialogRef = this.dialog.open(DialogAddFeedingComponent, {
      width: '300px',
      data: {
        feeding: {
          id: 0,
          date: new Date(),
          type: '',
          weight: 0,
        },
      }, disableClose: true
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
            reptile.feedings.push(Object.assign({}, result))
            this.reptile.feedings.push(result);
            this.reptileService.updateReptile(reptile).subscribe();
            this.updateReptileStorage();
            this.myTable.renderRows();
            this.dataSource._updateChangeSubscription();
          })
      }
    });
  }

  deleteFeeding(reptileid: any): void {
    for (let i = 0; i < this.selection.selected.length; i++) {
      for (let j = 0; j < this.dataSource.data.length; j++) {
        if (this.selection.selected[i].id === this.dataSource.data[j].id) {
          this.dataSource.data.splice(j, 1)
          this.reptileService.getReptile(reptileid)
            .subscribe(reptile => {
              reptile.feedings = this.dataSource.data
              this.reptileService.updateReptile(reptile).subscribe();
              this.updateReptileStorage();
              this.myTable.renderRows();
              this.dataSource._updateChangeSubscription();
            })
        }
      }
    }
  }

  /*---------------------------------------------------------------------------------------------------
                                         Tabellen-Filter
  -----------------------------------------------------------------------------------------------------*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

    }
  }

  /*---------------------------------------------------------------------------------------------------
                                        Tabellen-Selection
  -----------------------------------------------------------------------------------------------------*/

  /** Pr??ft ob alle Zeilen in der Tabelle selektiert sind oder nicht.*/
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** W??hlt alle Zeilen aus, sofern noch nicht alle Zeilen selektiert sind. Andernfalls werden
   *  alle Zeilen deselektiert.*/
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** Die Bezeichnung f??r das Kontrollk??stchen in der ??bergebenen Zeile */
  checkboxLabel(row?: Feeding): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
