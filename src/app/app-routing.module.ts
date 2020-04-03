import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { LgoinComponent } from "./Auth/lgoin/lgoin.component";
import { RegisterComponent } from "./Auth/register/register.component";
import { AuthGuard } from "./Auth/auth.guard";
// import { ForgotpasswordComponent } from "./auth/forgotpassword/forgotpassword.component";
import { ResetpasswordComponent } from "./Auth/resetpassword/resetpassword.component";
import { HttpParameterCodec } from "@angular/common/http";
import { AdminPanalComponent } from "./admin/admin-panal/admin-panal.component";
import { ForbiddenComponent } from "./Auth/forbidden/forbidden.component";
import { LoggedinUserInfoComponent } from "./Auth/loggedin-user-info/loggedin-user-info.component";
import { AdvanceSearchComponent } from "./advance-search/advance-search.component";
import { ForgotpasswordComponent } from "./Auth/forgotpassword/forgotpassword.component";

const routes: Routes = [

  {
    path: "home", component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] }
  },
  { path: "login", component: LgoinComponent },
  { path: "register", component: RegisterComponent },
  { path: "forbidden", component: ForbiddenComponent },

  { path: "forgotpassword", component: ForgotpasswordComponent },
  { path: "loggedinUserInfo", component: LoggedinUserInfoComponent },
  { path: "resetpassword/:userId/:code", component: ResetpasswordComponent },
  {
    path: "searchresult",
    component: SearchResultComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] }
  },
  {
    path: "advanceSearch",
    component: AdvanceSearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin", "Manager", "Dispatcher", "Employee"] }
  },
  { path: "", pathMatch: "full", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppRoutedCompoenets = [
  HomeComponent,
  SearchResultComponent,
  ResetpasswordComponent,
  ForgotpasswordComponent,
  LgoinComponent,
  LoggedinUserInfoComponent,
  ForbiddenComponent,
  RegisterComponent
];
