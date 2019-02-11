import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {  BolRoutingModule } from "./bol.routing";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { NgxSpinnerModule } from "ngx-spinner";

import { AdditemComponent } from "./additem/additem.component";
import {  ModalTriggerDirective, SharedModule } from "../common";
import { ContainerService } from "../Services/container.service";
import {
  BldgLocationsReolver,
  VehiclesReolver,
  ContainersReolver
} from "../resolvers";
import { SavedBolListComponent } from "./saved-bol-list/saved-bol-list.component";
import { SubmittedBolListComponent } from "./submitted-bol-list/submitted-bol-list.component";
import { BollistComponent } from "./bollist/bollist.component";
import { AddbolComponent } from "./addbol/addbol.component";
import { BolComponent } from "./bol.component";
import { BolDetailComponent } from "./bol-detail/bol-detail.component";
import { NewbolComponent } from './newbol/newbol.component';
import { BolModule } from "../bol/bol.module";
import { BolPrintComponent } from "./bol-print/bol-print.component";


// import { BolService,LocationsService } from '../dataServices';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BolRoutingModule,
    RouterModule,
    SharedModule,
    BolModule,
    NgxSpinnerModule
  ],
  declarations: [
    // ModalTriggerDirective, //*********  */it is already included in SharedModel export 
    BollistComponent,
    SavedBolListComponent,
    SubmittedBolListComponent,
    AddbolComponent,
    BolComponent,
    BolDetailComponent,
    AdditemComponent,
    NewbolComponent,
    BolPrintComponent,
  ],
  providers: [
    ContainerService,
    BldgLocationsReolver,
    VehiclesReolver,
    ContainersReolver
  ],
  exports:[
    BollistComponent,
    SavedBolListComponent,
    SubmittedBolListComponent,
    AddbolComponent,
    BolDetailComponent,
    NewbolComponent,
    BolComponent
  ]
})
export class UserBolModule {}
