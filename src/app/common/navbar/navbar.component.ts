import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { SearchResult } from "../../models/searchResult";
import { TOASTR_TOKEN, Toastr } from "../toastr.service";
import { AuthenticationService } from "src/app/Services";

@Component({
  selector: "ez-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  searchTerm: string = "";
  result: SearchResult[] = [];

  constructor(
    public authServices: AuthenticationService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toaster: Toastr
  ) { }

  ngOnInit() { }

  showHide() {
    this.isCollapsed = !this.isCollapsed;
  }

  // goSearchResultPage(searchTerm: string) {
  //   //I was not able to refresh the search-result component
  //   // I got this code below form folowing link- 9/16/2018
  //   //https://github.com/angular/angular/issues/13831#issuecomment-418984942
  //   if (searchTerm.trim() == "") {
  //     this.toaster.warning("Enter search keyword!");
  //     return;
  //   }

  //   this.router
  //     .navigateByUrl("/", { skipLocationChange: true })
  //     .then(() => this.router.navigate(["/search/" + searchTerm]));
  // }

  // searchBtnClicked(data) {
  //   //console.log('navbar searchBtnClick', data)
  //   return data
  // }


  logout() {
    this.authServices.logOut();
    // this.router.navigate(["/login"]);
    // location.reload()
  }
}
