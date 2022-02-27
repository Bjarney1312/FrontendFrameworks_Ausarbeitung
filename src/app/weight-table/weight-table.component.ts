import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {Reptile} from "../data/reptile";
import {Weight} from "../data/weight";
import {ReptileService} from "../reptile.service";
import {DialogAddWeightComponent} from "../dialog-add-weight/dialog-add-weight.component";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-weight-table',
  templateUrl: './weight-table.component.html',
  styleUrls: ['./weight-table.component.css']
})
export class WeightTableComponent implements OnInit, AfterViewInit {

  @Input() reptile!: Reptile;

  @ViewChild('myTable') myTable!: MatTable<Weight>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: any[] = ['select', 'date', 'weight'];
  dataSource!: MatTableDataSource<Weight>
  selection = new SelectionModel<Weight>(true, []);

  constructor(public dialog: MatDialog,
              private reptileService: ReptileService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Weight>(this.reptile.weight);
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

  openAddWeightDialog(reptileid: any): void {
    const dialogRef = this.dialog.open(DialogAddWeightComponent, {
      width: '300px',
      data: {weights: {}}, disableClose: true
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
            reptile.weight.push(Object.assign({}, result))
            this.reptileService.updateReptile(reptile).subscribe();
            this.reptile.weight.push(result);
            this.updateReptileStorage();
            this.myTable.renderRows();
            this.dataSource._updateChangeSubscription();
          })
      }
    });
  }

  deleteWeight(reptileid: any): void {
    for (let i = 0; i < this.selection.selected.length; i++) {
      for (let j = 0; j < this.dataSource.data.length; j++) {
        if (this.selection.selected[i].id === this.dataSource.data[j].id) {
          this.dataSource.data.splice(j, 1);
          this.reptileService.getReptile(reptileid)
            .subscribe(reptile => {
              reptile.weight = this.dataSource.data
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

  /** Prüft ob alle Zeilen in der Tabelle selektiert sind oder nicht.*/
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Wählt alle Zeilen aus, sofern noch nicht alle Zeilen selektiert sind. Andernfalls werden
   *  alle Zeilen deselektiert.*/
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** Die Bezeichnung für das Kontrollkästchen in der übergebenen Zeile */
  checkboxLabel(row?: Weight): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
