import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule, AppRoutedCompoenets } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BolModule } from "./bol/bol.module";
import {
  TOASTR_TOKEN,
  Toastr,
  JQ_TOKEN,
  NavbarComponent,
  // SimpleModalComponent,
  // ModalTriggerDirective,
  SharedModule
} from "./common/index";
import { SearchResultComponent } from "./search-result/search-result.component";
// import { SearchTriggerDirective } from "./search/searchTrigger.directive";
import {
  BolService,
  ItemService,
  VehiclesService,
  LocationsService,
  PbgService,
  AuthenticationService
} from "./Services";
import { AuthGuard } from "./Auth/auth.guard";
import { AuthInterceptor } from "./Auth/auth.interceptor";
import { AdminModule } from "./admin/admin.module";
import { FwModule } from "./fw/fw.module";
import { SidenavComponent } from "./common/sidenav/sidenav.component";
import { UserBolModule } from "./userBol/userBol.module";
import { DispatcherModule } from "./dispatcher/dispatcher.module";
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { ManagerModule } from "./manager/manager.module";

let toastr: Toastr = window["toastr"];
let jQuery = window["$"];
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BolModule,
    UserBolModule,
    DispatcherModule,
    ManagerModule,
    RouterModule,

    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    FwModule,
    AdminModule
  ],
  declarations: [

    AppComponent,
    AppRoutedCompoenets,
    NavbarComponent,
    SidenavComponent,
    SearchResultComponent,
    AdvanceSearchComponent,

    // SearchTriggerDirective,

  ],
  providers: [
    BolService,
    ItemService,
    VehiclesService,
    LocationsService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthenticationService,
    PbgService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
