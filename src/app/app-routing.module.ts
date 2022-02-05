import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReptileDashboardComponent} from "./reptile-dashboard/reptile-dashboard.component";
import {ReptileDetailsComponent} from "./reptile-details/reptile-details.component";

const routes: Routes = [
  { path: 'dashboard', component: ReptileDashboardComponent },
  { path: 'detail/:id', component: ReptileDetailsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
