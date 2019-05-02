import { Component, OnInit, Output, Input, Inject, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import {
  VehiclesService,
  LocationsService,
  BolService,
} from "../../Services";
import { Vehicle } from "../../models/vehicle";
import { NgxSpinnerService } from "ngx-spinner";
import { Container } from "../../models/container";
import { TOASTR_TOKEN, Toastr } from "../../common/toastr.service";
import { BldgLocation } from "../../models/bldgLocation";
// import { Item } from "src/app/models/item";
import { AddUpdateBol } from "src/app/models/addUpdateBol";



@Component({
  selector: 'ez-bol-form',
  templateUrl: './bol-form.component.html',
  styleUrls: ['./bol-form.component.css'],
  // viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})

export class BolFormComponent implements OnInit {
  errorMsg;
  bolForm: FormGroup;
  userInfo: any;
  bldgLocations: BldgLocation[] = [];
  vehicles: Vehicle[] = [];
  containers: Container[] = [];
  @Input() items: any[] = []


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bolService: BolService,
    private vehicleService: VehiclesService,
    private locationService: LocationsService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    // console.log(this.items.length)
    this.readyToSubmit();

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.bldgLocations = this.route.snapshot.data.bldgLocations;
    // this.vehicles = this.route.snapshot.data.vehicles;
    this.getLocations();
    this.getVehicles();

    this.bolForm = this.fb.group({
      bolId: [{ value: 0, disabled: true }],
      requesterId: [{ value: this.userInfo.badge, disabled: true }],
      recipient: '',
      expidate: false,
      submitted: false,
      submittedDate: '',
      canceled: false,
      canceledDate: '',
      space: 0,
      userComment: '',
      deliveryLocation: '',
      pickupLocation: '',
      vehicle: ''
    });


    this.route.paramMap.subscribe(params => {
      if (params.get("bolId") != null) {
        this.getBolDetails(params.get("bolId"));
        // this.getBolItems(params.get("bolId"));
      }
    });
  }

  getBolDetails(bolId) {
    this.bolService.getBolDetails(bolId).subscribe(
      data => {
        // this.spinner.hide();
        this.fillBolForm(data);
        // console.log(data)
      },
      err => {
        // console.log(err);
        // this.spinner.hide();
      }
    );
  }

  fillBolForm(bol) {
    this.bolForm.reset();
    this.bolForm.patchValue({
      bolId: bol.bolId,
      requesterId: bol.requesterId,
      recipient: bol.recipient,
      expidate: bol.expidate,
      submitted: bol.submitted,
      submittedDate: bol.submittedDate,
      canceled: bol.canceled,
      canceledDate: bol.canceledDate,
      space: bol.space,
      comment: bol.comment,
      deliveryLocation: bol.deliveryLocation.locationId,
      pickupLocation: bol.pickupLocation.locationId,
      vehicle: bol.vehicle.vehicleId
    });
    // this.deliveryLocation.reset(bol.deliveryLocation["locationName"]);
    // this.ploc( bol.pickupLocation.locationName);
    // this.bolForm.get('deliveryLocation').setValue(bol.deliveryLocation.locationName);

  }


  getLocations() {
    this.spinner.show()
    this.locationService
      .getLocations()
      .subscribe(
        data => { this.bldgLocations = data; this.spinner.hide() },
        (err: any) => (this.errorMsg = err)
      );
  }

  getVehicles() {
    this.spinner.show()
    this.vehicleService
      .getVehicles()
      .subscribe(
        data => { this.vehicles = data; this.spinner.hide() },
        (err: any) => (this.errorMsg = err)
      );
  }

  // 9/12/18, 9:01 AM
  getDateTime() {
    var d = new Date();
    return d; //.getMonth()+'/'+'/'+d.getFullYear();
  }



  saveBol() {
    console.log(this.bolForm.getRawValue());
    var formValues = this.bolForm.getRawValue();
    var _bol = new AddUpdateBol();
    _bol.bolId = formValues.bolId;
    _bol.requesterId = formValues.requesterId;
    _bol.userComment = formValues.userComment;
    _bol.deliveryLocationId = formValues.deliveryLocation;
    _bol.pickupLocationId = formValues.pickupLocation;
    _bol.vehicleId = formValues.vehicle;
    _bol.expidate = formValues.expidate;
    _bol.recipient = formValues.recipient;
    _bol.space = formValues.space;

    _bol.submitted = formValues.submitted;
    _bol.submittedDate = formValues.submittedDate;
    _bol.canceled = formValues.canceled;
    _bol.canceledDate = formValues.canceledDate;

    if (this.bolForm.controls.bolId.value !== 0) {
      this.updateBol(_bol);
    } else {
      this.addBol(_bol);
    }
  }



  addBol(bol: any) {
    this.spinner.show();
    this.errorMsg = "";
    this.bolService.addBol(bol).subscribe(
      b => {
        // this.disableAddItemBtn = false;
        this.spinner.hide();
        this.bolForm.controls.bolId.patchValue(b.bolId);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

  updateBol(bol) {
    this.errorMsg = "";
    this.spinner.show();

    this.bolService.updateBol(bol).subscribe(
      b => {
        this.spinner.hide();
        //this.bolId.reset(b.bolId);
        console.log(b);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

  submitBol() {
    // var d = moment().format("MM/DD/YYYY, h:mm:ss a");
    this.bolForm.controls.submittedDate.patchValue(this.getDateTime());
    this.bolForm.controls.submitted.patchValue(true);
    this.bolForm.controls.canceledDate.patchValue(null);
    this.bolForm.controls.canceled.patchValue(false)
    this.saveBol();

  }

  cancelBol() {

    this.bolForm.controls.submittedDate.patchValue(null);
    this.bolForm.controls.submitted.patchValue(false);
    this.bolForm.controls.canceled.patchValue(true);
    this.bolForm.controls.canceledDate.patchValue(this.getDateTime());


    this.saveBol();
  }


  deleteBol() {
    if (this.bolForm.controls.bolId.value == 0) return;
    this.bolService.deleteBol(this.bolForm.controls.bolId.value).subscribe(
      b => {
        this.spinner.hide();
        this.toastr.success("Bol is deleted successfuly!");
        this.router.navigate(["/addbol"]);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

  readyToSubmit() {

    if (this.bolForm.controls.bolId.value == 0) {
      return { disabled: true }
    } else {
      return { disabled: false }
    }


  }


}
// bolId: Number;
// createdDate: Date;
// requesterId: String;
// recipient: String;
// expidate: String;
// space: Number;
// submittedDate: Date;
// submitted: Boolean;
// canceled: Boolean;
// canceledDate: Date;
// deliveryLocationLocationName:String;
// pickupLocationLocationName:String;
// vehicleVehicleType:String;
// pickupLocation: Number;
// deliveryLocationId: Number;
// vehicleId: Number;
