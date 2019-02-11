import { Component, OnInit, Output, Input, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import {
  BolService,
  VehiclesService,
  ContainerService,
  ItemService
} from "../../Services";
import { LocationsService } from "../../Services/locations.service";
// import { BolCrate } from "../../models/bol-crate";
import { Vehicle } from "../../models/vehicle";

import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { Container } from "../../models/container";
import { Item } from "../../models/item";
import { Bol } from "../../models/bol";
import { AddUpdateBol } from "../../models/addUpdateBol";
import { TOASTR_TOKEN, Toastr } from "../../common/toastr.service";
import { BldgLocation } from "../../models/bldgLocation";
import { debounceTime } from "rxjs/operators";


@Component({
  selector: 'ez-bol-detail',
  templateUrl: './bol-detail.component.html',
  styleUrls: ['./bol-detail.component.css']
})
export class BolDetailComponent implements OnInit {

 

  constructor(
  
  ) { }

  ngOnInit() {

   

  }

}
