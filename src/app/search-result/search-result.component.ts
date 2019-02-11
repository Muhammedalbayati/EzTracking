import { Component, OnInit, Input } from "@angular/core";
import { SearchResult } from "../models/searchResult";
import { BolService } from "../Services";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { NgxSpinnerService } from "ngx-spinner";

import { SearchList } from "./searchList";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "ez-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"]
})
export class SearchResultComponent implements OnInit {
  // searchTerm: any;
  result: SearchResult[];

  constructor(public bolService: BolService) { }

  ngOnInit() {

    this.result = []
    this.result = this.bolService.searchResult;

  }




}
