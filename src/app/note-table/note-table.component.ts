import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {Reptile} from "../data/reptile";
import {Note} from "../data/note";
import {ReptileService} from "../reptile.service";
import {DialogAddNoteComponent} from "../dialog-add-note/dialog-add-note.component";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-note-table',
  templateUrl: './note-table.component.html',
  styleUrls: ['./note-table.component.css']
})
export class NoteTableComponent implements OnInit, AfterViewInit {

  @Input() reptile!: Reptile;

  @ViewChild('myTable') myTable!: MatTable<Note>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: any[] = ['select', 'date', 'note'];
  dataSource!: MatTableDataSource<Note>
  selection = new SelectionModel<Note>(true, []);

  constructor(public dialog: MatDialog,
              private reptileService: ReptileService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Note>(this.reptile.notes);
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

  openAddNoteDialog(reptileid: any): void {
    const dialogRef = this.dialog.open(DialogAddNoteComponent, {
      width: '300px',
      data: {weight: {}}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result.date === undefined) {
          result.date = new Date().toLocaleDateString();
        } else {
          result.date = result.date.toLocaleDateString();
        }
        if (result.note === undefined) {
          result.note = 'Kein Eintrag';
        }
        this.reptileService.getReptile(reptileid)
          .subscribe(reptile => {
            reptile.notes.push(Object.assign({}, result));
            this.reptileService.updateReptile(reptile).subscribe();
            this.reptile.notes.push(result);
            this.updateReptileStorage();
            this.myTable.renderRows();
          })
      }
    });
  }

  deleteNotes(reptileid: any): void {
    for (let i = 0; i < this.selection.selected.length; i++) {
      for (let j = 0; j < this.dataSource.data.length; j++) {
        if (this.selection.selected[i].id === this.dataSource.data[j].id) {
          this.dataSource.data.splice(j, 1)
          this.reptileService.getReptile(reptileid)
            .subscribe(reptile => {
              reptile.notes = this.dataSource.data;
              this.reptileService.updateReptile(reptile).subscribe();
              this.updateReptileStorage()
              this.myTable.renderRows()
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
  checkboxLabel(row?: Note): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
