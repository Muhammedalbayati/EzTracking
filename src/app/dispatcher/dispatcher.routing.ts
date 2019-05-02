import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../Auth/auth.guard';
import { BolRequestsComponent } from './bol-requests/bol-requests.component';
import { BolreqDetailsComponent } from './bolreq-details/bolreq-details.component';
import { CompletedRequestsComponent } from './completed-requests/completed-requests.component';
import { ActionsComponent } from './actions/actions.component';
import { AgGridBolsComponent } from './ag-grid-bols/ag-grid-bols.component';
import { AdddriverComponent } from './adddriver/adddriver.component';
import { DriverslistComponent } from './driverslist/driverslist.component';

const routes: Routes = [
    { path: "bolrequests", component: BolRequestsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    { path: "agbolrequests", component: AgGridBolsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    { path: "completedrequests", component: CompletedRequestsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    { path: "bolreq-details/:bolId", component: BolreqDetailsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    { path: "actions", component: ActionsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    { path: "adddriver", component: AdddriverComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    // { path: "driverslist", component: DriverslistComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class DispatcherRoutingModule { }