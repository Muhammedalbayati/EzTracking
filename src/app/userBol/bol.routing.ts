import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BolComponent } from "./bol.component";
import { AddbolComponent } from "./addbol/addbol.component";
import { Bol } from "../models/bol";
import {
  BldgLocationsReolver,
  VehiclesReolver,
  ContainersReolver
} from "../resolvers";
import { AuthGuard } from "../Auth/auth.guard";
import { SavedBolListComponent } from "./saved-bol-list/saved-bol-list.component";
import { SubmittedBolListComponent } from "./submitted-bol-list/submitted-bol-list.component";
import { BolDetailComponent } from "./bol-detail/bol-detail.component";
import { NewbolComponent } from "./newbol/newbol.component";
import { BolPrintComponent } from "./bol-print/bol-print.component";

const routes: Routes = [

  { path: "savedbols", component: SavedBolListComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] } },
  { path: "submittedbols", component: SubmittedBolListComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] } },
  { path: "boldetail/:bolId", component: BolDetailComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] } },
  { path: "addbol", component: AddbolComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] } },
  { path: "bolprint/:bolId", component: BolPrintComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] } },
  // { path: "addbol/:bolId", component: NewbolComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] } },

  // {
  //   path: "bol",
  //   component: BolComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] },
  //   children: [
  //     { path: "bollist", component: BollistComponent },
  //     {
  //       path: "addbol",
  //       component: AddbolComponent
  //       // resolve: { bldgLocations: BldgLocationsReolver,vehicles:VehiclesReolver,containers:ContainersReolver }
  //     },
  //     {
  //       path: "addbol/:bolId",
  //       component: AddbolComponent
  //       // resolve: { bldgLocations: BldgLocationsReolver,vehicles:VehiclesReolver,containers:ContainersReolver }
  //     }
  //   ]
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BolRoutingModule { }

// export const BolRoutedComponents = [
  // BollistComponent,
  // SavedBolListComponent,
  // SubmittedBolListComponent,
  // AddbolComponent,
  // BolComponent
// ];
