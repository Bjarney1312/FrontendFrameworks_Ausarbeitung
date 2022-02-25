import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MY_DATE_FORMATS} from './data/dateFormats';
import {DatePipe} from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";

import {ReptileDashboardComponent} from './reptile-dashboard/reptile-dashboard.component';
import {ReptileDetailsComponent} from './reptile-details/reptile-details.component';
import {ReptileSearchComponent} from './reptile-search/reptile-search.component';
import {DialogAddReptileComponent} from './dialog-add-reptile/dialog-add-reptile.component';
import {FeedingTableComponent} from './feeding-table/feeding-table.component';
import {DialogAddFeedingComponent} from './dialog-add-feeding/dialog-add-feeding.component';
import {WeightTableComponent} from './weight-table/weight-table.component';
import {NoteTableComponent} from './note-table/note-table.component';
import {DialogAddWeightComponent} from './dialog-add-weight/dialog-add-weight.component';
import {DialogAddNoteComponent} from './dialog-add-note/dialog-add-note.component';
import {DialogEditReptileComponent} from './dialog-edit-reptile/dialog-edit-reptile.component';
import {DialogDeleteReptileComponent} from './dialog-delete-reptile/dialog-delete-reptile.component';
import {BreederDashboardComponent} from './breeder-dashboard/breeder-dashboard.component';
import {DialogAddBreederComponent} from './dialog-add-breeder/dialog-add-breeder.component';
import {DialogEditBreederComponent} from './dialog-edit-breeder/dialog-edit-breeder.component';
import {DialogDeleteBreederComponent} from './dialog-delete-breeder/dialog-delete-breeder.component';
import {BreederSearchComponent} from './breeder-search/breeder-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ReptileDashboardComponent,
    ReptileDetailsComponent,
    ReptileSearchComponent,
    DialogAddReptileComponent,
    FeedingTableComponent,
    DialogAddFeedingComponent,
    WeightTableComponent,
    NoteTableComponent,
    DialogAddWeightComponent,
    DialogAddNoteComponent,
    DialogEditReptileComponent,
    DialogDeleteReptileComponent,
    BreederDashboardComponent,
    DialogAddBreederComponent,
    DialogEditBreederComponent,
    DialogDeleteBreederComponent,
    BreederSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    MomentDateModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSortModule
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
