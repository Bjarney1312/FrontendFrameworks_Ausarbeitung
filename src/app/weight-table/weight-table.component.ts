import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Reptile} from "../data/reptile";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Weight} from "../data/weight";
import {MatDialog} from "@angular/material/dialog";
import {ReptileService} from "../reptile.service";
import {MatPaginator} from "@angular/material/paginator";
import {DialogAddWeightComponent} from "../dialog-add-weight/dialog-add-weight.component";

@Component({
  selector: 'app-weight-table',
  templateUrl: './weight-table.component.html',
  styleUrls: ['./weight-table.component.css']
})
export class WeightTableComponent implements OnInit {

  @Input() reptile!: Reptile;
  @ViewChild('myTable') myTable!: MatTable<Weight>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any[] = ['select', 'date', 'weight'];
  dataSource!:MatTableDataSource<Weight>
  selection = new SelectionModel<Weight>(true, []);

  constructor(public dialog: MatDialog,
              private reptileService: ReptileService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Weight>(this.reptile.weight);
    this.dataSource.paginator = this.paginator;
  }

  updateReptileStorage():void{
    this.reptileService.getReptiles().subscribe(reptiles =>{
      localStorage.setItem('reptiles', JSON.stringify(reptiles))
    });
  }

  openAddWeightDialog(reptileid : any): void {
    const dialogRef = this.dialog.open(DialogAddWeightComponent, {
      width: '300px',
      data: {weights: {}}, disableClose:true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(result.date === undefined){
          result.date = new Date().toLocaleDateString();
        }
        else{
          result.date = result.date.toLocaleDateString();
        }
        if(result.weight === undefined){
          result.weight = 0.0;
        }
        this.reptileService.getReptile(reptileid)
          .subscribe(reptile => {
            reptile.weight.push(Object.assign({}, result))
            this.reptileService.updateReptile(reptile).subscribe();
            this.reptile.weight.push(result);
            this.updateReptileStorage();
            this.myTable.renderRows();
          })
      }
    });
  }

  deleteWeight(reptileid : any):void{
    for (let i = 0; i<this.selection.selected.length; i++){
      for(let j = 0; j<this.dataSource.data.length; j++){
        if(this.selection.selected[i].id === this.dataSource.data[j].id){
          this.dataSource.data.splice(j,1);
          this.reptileService.getReptile(reptileid)
            .subscribe(reptile => {
              reptile.weight = this.dataSource.data
              this.reptileService.updateReptile(reptile).subscribe();
              this.updateReptileStorage();
              this.myTable.renderRows();
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
  checkboxLabel(row?: Weight): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

}
