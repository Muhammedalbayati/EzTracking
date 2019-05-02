import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ManagerRoutingModule } from './manager-routing.module';
import { AddbuildingComponent } from './addbuilding/addbuilding.component';
import { BuildingslistComponent } from './buildingslist/buildingslist.component';
import { PbgslistComponent } from './pbgslist/pbgslist.component';
import { AddpbgsComponent } from './addpbgs/addpbgs.component';
import { AddcargoComponent } from './addcargo/addcargo.component';
import { CargolistComponent } from './cargolist/cargolist.component';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';
import { VehicleslistComponent } from './vehicleslist/vehicleslist.component';
import { AddcontainerComponent } from './addcontainer/addcontainer.component';
import { ContainerlistComponent } from './containerlist/containerlist.component';

import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    
    ManagerRoutingModule
  ],
  declarations: [
    AddbuildingComponent,
    BuildingslistComponent,
    PbgslistComponent,
    AddpbgsComponent,
    AddcargoComponent,
    CargolistComponent,
    AddvehicleComponent,
    VehicleslistComponent,
    AddcontainerComponent,
    ContainerlistComponent]
})
export class ManagerModule { }
