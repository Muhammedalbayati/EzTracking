import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../Auth/auth.guard";
import { NgModule } from "@angular/core";
import {
  AdminPanalComponent,
  UserslistComponent,
  UserDetailComponent
} from ".";
import { RolesComponent } from "./roles/roles.component";

const routes: Routes = [
  {
    path: "roles",
    component: RolesComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },


    // children: [
    //   {
    //     path: "roles",
    //     component: RolesComponent,
    //     canActivate: [AuthGuard],
    //     data: { roles: ["Admin"] },
    //     outlet: "adminPanal"
    //   },
    //   {
    //     path: "usersList",
    //     component: UserslistComponent,
    //     canActivate: [AuthGuard],
    //     data: { roles: ["Admin"] },
    //     outlet: "adminPanal"
    //   }
    // ]
  },
  { path: "usersList", component: UserslistComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } },
  { path: "userDetails/:userId", component: UserDetailComponent, canActivate: [AuthGuard], data: { roles: ["Admin"] } }
//{ path: "resetpassword/:userId/:code", component: ResetpasswordComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

export const AdminRoutedComponents = [
  AdminPanalComponent,
  UserslistComponent,
  UserDetailComponent,
  RolesComponent
];
