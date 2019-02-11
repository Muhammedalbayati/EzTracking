import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../Auth/auth.guard';
import { BolRequestsComponent } from './bol-requests/bol-requests.component';
import { BolreqDetailsComponent } from './bolreq-details/bolreq-details.component';
import { CompletedRequestsComponent } from './completed-requests/completed-requests.component';
import { ActionsComponent } from './actions/actions.component';

const routes: Routes = [
    { path: "bolrequests", component: BolRequestsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    { path: "completedrequests", component: CompletedRequestsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    { path: "bolreq-details/:bolId", component: BolreqDetailsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
    { path: "actions", component: ActionsComponent, canActivate: [AuthGuard], data: { roles: ["Admin", "Dispatcher"] } },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class DispatcherRoutingModule { }