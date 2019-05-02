import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddbuildingComponent } from './addbuilding/addbuilding.component';
import { AuthGuard } from '../Auth/auth.guard';
import { AddcargoComponent } from './addcargo/addcargo.component';
import { AddcontainerComponent } from './addcontainer/addcontainer.component';
import { AddpbgsComponent } from './addpbgs/addpbgs.component';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';

const routes: Routes = [
  { path: "addBuilding", component: AddbuildingComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager"] } },
  { path: "addCargo", component: AddcargoComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager"] } },
  { path: "addContainer", component: AddcontainerComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager"] } },
  { path: "addPbg", component: AddpbgsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager"] } },
  { path: "addVehicle", component: AddvehicleComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Manager"] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
