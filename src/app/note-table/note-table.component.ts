import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Reptile} from "../data/reptile";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {ReptileService} from "../reptile.service";
import {Note} from "../data/note";
import {DialogAddNoteComponent} from "../dialog-add-note/dialog-add-note.component";

@Component({
  selector: 'app-note-table',
  templateUrl: './note-table.component.html',
  styleUrls: ['./note-table.component.css']
})
export class NoteTableComponent implements OnInit {

  @Input() reptile!: Reptile;
  @ViewChild('myTable') myTable!: MatTable<Note>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any[] = ['select', 'date', 'note'];
  dataSource!:MatTableDataSource<Note>

  selection = new SelectionModel<Note>(true, []);

  constructor(public dialog: MatDialog, private reptileService: ReptileService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Note>(this.reptile.notes);
    this.dataSource.paginator = this.paginator;
  }

  openAddNoteDialog(reptileid : any): void{
    const dialogRef = this.dialog.open(DialogAddNoteComponent, {
      width: '300px',
      data: {weight: {}}, disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(result.date === undefined){
          result.date = new Date().toLocaleDateString();
        }
        else{
          result.date = result.date.toDate().toLocaleDateString()
        }
        if(result.note === undefined){
          result.note = 'Kein Eintrag';
        }
        this.reptileService.getReptile(reptileid)
          .subscribe(reptile => {
            reptile.notes.push(Object.assign({}, result))
            this.reptileService.updateReptile(reptile).subscribe();
            this.reptile.notes.push(result)
            this.myTable.renderRows()
          })
      }
    });
  }

  deleteNotes(reptileid : any):void{
    for (let i = 0; i<this.selection.selected.length; i++){
      for(let j = 0; j<this.dataSource.data.length; j++){
        if(this.selection.selected[i].id === this.dataSource.data[j].id){
          this.dataSource.data.splice(j,1)
          this.reptileService.getReptile(reptileid)
            .subscribe(reptile => {
              reptile.notes = this.dataSource.data
              this.reptileService.updateReptile(reptile).subscribe();
              this.myTable.renderRows()
            })
        }
      }
    }
  }




  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Note): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

}
