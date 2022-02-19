import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

import { LoginPageComponent } from './login-page/login-page.component';
import { ReptileDashboardComponent } from './reptile-dashboard/reptile-dashboard.component';
import { ReptileDetailsComponent } from './reptile-details/reptile-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReptileSearchComponent } from './reptile-search/reptile-search.component';
import { DialogAddReptileComponent } from './dialog-add-reptile/dialog-add-reptile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FeedingTableComponent } from './feeding-table/feeding-table.component';
import { DialogAddFeedingComponent } from './dialog-add-feeding/dialog-add-feeding.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";


import { MomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from './data/dateFormats';
import { DatePipe } from '@angular/common';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { WeightTableComponent } from './weight-table/weight-table.component';
import { NoteTableComponent } from './note-table/note-table.component';
import { DialogAddWeightComponent } from './dialog-add-weight/dialog-add-weight.component';
import { DialogAddNoteComponent } from './dialog-add-note/dialog-add-note.component';
import { DialogEditReptileComponent } from './dialog-edit-reptile/dialog-edit-reptile.component';
import { DialogDeleteReptileComponent } from './dialog-delete-reptile/dialog-delete-reptile.component';
import { BreederDashboardComponent } from './breeder-dashboard/breeder-dashboard.component';
import { DialogAddBreederComponent } from './dialog-add-breeder/dialog-add-breeder.component';
import { DialogEditBreederComponent } from './dialog-edit-breeder/dialog-edit-breeder.component';
import { DialogDeleteBreederComponent } from './dialog-delete-breeder/dialog-delete-breeder.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
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
    DialogDeleteBreederComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
