import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Feeding} from "../data/feeding";
import {Reptile} from "../data/reptile";
import {ReptileService} from "../reptile.service";
import {DialogAddFeedingComponent} from "../dialog-add-feeding/dialog-add-feeding.component";
import {MatDialog} from "@angular/material/dialog";
import {SelectionModel} from "@angular/cdk/collections";


@Component({
  selector: 'app-feeding-table',
  templateUrl: './feeding-table.component.html',
  styleUrls: ['./feeding-table.component.css']
})
export class FeedingTableComponent implements OnInit {

  @Input() reptile!: Reptile;
  @ViewChild('myTable') myTable!: MatTable<Feeding>;

  displayedColumns: any[] = ['select', 'date', 'type', 'weight'];
  dataSource!:MatTableDataSource<Feeding>

  selection = new SelectionModel<Feeding>(true, []);

  constructor(public dialog: MatDialog, private reptileService: ReptileService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Feeding>(this.reptile.feedings);
    this.dataSource.paginator = this.paginator;
  }

  openAddFeedingDialog(reptileid : any): void {
    const dialogRef = this.dialog.open(DialogAddFeedingComponent, {
      width: '300px',
      data: {
        feeding: {
          id: 0,
          date: new Date(),
          type: '',
          weight: 0,
        },
      }, disableClose:true});
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(result.date === undefined){
          result.date = new Date().toLocaleDateString();
        }
        else{
          result.date = result.date.toDate().toLocaleDateString()
        }
        if(result.type === undefined){
          result.type = '-';
        }

        if(result.weight === undefined){
          result.weight = 0.0;
        }

        this.reptileService.getReptile(reptileid)
          .subscribe(reptile => {
            reptile.feedings.push(Object.assign({}, result))
            this.reptileService.updateReptile(reptile).subscribe();
            this.reptile.feedings.push(result)
            this.myTable.renderRows()
          })
      }
    });
  }

  deleteFeeding(reptileid : any):void{
    for (let i = 0; i<this.selection.selected.length; i++){
      for(let j = 0; j<this.dataSource.data.length; j++){
        if(this.selection.selected[i].id === this.dataSource.data[j].id){
          this.dataSource.data.splice(j,1)
          this.reptileService.getReptile(reptileid)
            .subscribe(reptile => {
              reptile.feedings = this.dataSource.data
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
  checkboxLabel(row?: Feeding): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
