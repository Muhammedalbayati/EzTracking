import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatcherRoutingModule } from './dispatcher.routing';
import { BolRequestsComponent } from './bol-requests/bol-requests.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BolreqDetailsComponent } from './bolreq-details/bolreq-details.component';
import { UserBolModule } from '../userBol/userBol.module';
import { CompletedRequestsComponent } from './completed-requests/completed-requests.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActionsComponent } from './actions/actions.component';
import { SharedModule } from '../common';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    SharedModule,
    UserBolModule,
    DispatcherRoutingModule
  ],
  declarations: [BolRequestsComponent, BolreqDetailsComponent, CompletedRequestsComponent, ActionsComponent]
})
export class DispatcherModule { }
