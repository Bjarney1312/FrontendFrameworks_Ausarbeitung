import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReptileDashboardComponent} from "./reptile-dashboard/reptile-dashboard.component";
import {ReptileDetailsComponent} from "./reptile-details/reptile-details.component";
import {BreederDashboardComponent} from "./breeder-dashboard/breeder-dashboard.component";

const routes: Routes = [
  { path: 'reptile_dashboard', component: ReptileDashboardComponent },
  { path: 'detail/:id', component: ReptileDetailsComponent },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: ReptileDashboardComponent},
  { path: 'breeder_dashboard', component: BreederDashboardComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
