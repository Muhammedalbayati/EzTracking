import { Component, OnInit, Output, Input, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { SignalR, SignalRConnection, IConnectionOptions, BroadcastEventListener } from 'ng2-signalr';


import {
  BolService,
  VehiclesService,
  ContainerService,
  ItemService,
  CargoService
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
import { Cargo } from "src/app/models/cargo";


@Component({
  selector: "ez-addbol",
  templateUrl: "./addbol.component.html",
  styleUrls: ["./addbol.component.css"]
})
export class AddbolComponent implements OnInit {
  submittedHours: number;  //= moment().format("MM/DD/YYYY, h:mm:ss a");
  bolForm: FormGroup;
  userInfo: any;
  bldgLocations: BldgLocation[] = [];
  vehicles: Vehicle[] = [];
  containers: Container[] = [];
  cargos: Cargo[] = [];

  items: Item[] = [];
  errorMsg;
  itemId: number;
  idx: number;

  //1. create connection
  connection = this._signalR.createConnection();
  // 2.create a listener object
  bolListener = new BroadcastEventListener<any>('CancelBol');

  constructor(
    private _signalR: SignalR,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bolService: BolService,
    private itemService: ItemService,
    private vehicleService: VehiclesService,
    private containerService: ContainerService,
    private locationService: LocationsService,
    private CargoService: CargoService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.submittedHours = 0
    this.items = []
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // //3. start connection
    this.connection.start();
    this.connection.listen(this.bolListener);
    // this.signalrConnect();

    // this.bldgLocations = this.route.snapshot.data.bldgLocations;
    // this.vehicles = this.route.snapshot.data.vehicles;
    this.getLocations();
    this.getVehicles();
    this.getCargos();


    this.bolForm = this.fb.group({
      bolId: 0,
      bolNumber: [{ value: null, disabled: true }, [Validators.required]],
      externalBol: false,
      requesterId: [{ value: this.userInfo.firstName.substring(1, 0) + this.userInfo.lastName + this.userInfo.badge, disabled: true }, [Validators.required]],
      recipient: null,
      expidate: false,
      submitted: false,
      submittedDate: null,
      completed: false,
      canceled: false,
      canceledDate: null,
      space: [0, [Validators.required, Validators.min(1), Validators.max(20)]],
      userComment: null,
      dispatcherComment: null,
      deliveryLocation: [null, [Validators.required]],
      pickupLocation: [null, [Validators.required]],
      vehicle: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      // isCrossDock: false,
      crossDockAddress: [{ value: null, disabled: true }]
    });

    this.route.paramMap.subscribe(params => {
      if (params.get("bolId") != null) {
        this.getBolDetails(params.get("bolId"));
        // this.getBolItems(params.get("bolId"));
      }
    });

    this.hideOrShowExternalCheckBox();

  }

  hideOrShowExternalCheckBox() {
    // //console.log(this.userInfo.roles.includes('Admin','Dispatcher'))
    return this.userInfo.roles.includes('Admin') || this.userInfo.roles.includes('Dispatcher')
  }

  getSelectedOptionText(event: Event) {
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    let selectElementText = selectedOptions[selectedIndex].text;

    //console.log(selectElementText)
    if (selectElementText == 'CrossDock') {
      this.bolForm.controls['crossDockAddress'].clearValidators();
      this.bolForm.controls['crossDockAddress'].enable();
      this.bolForm.controls['crossDockAddress'].setValidators(Validators.required)
      this.bolForm.controls['crossDockAddress'].updateValueAndValidity();
    } else {
      this.bolForm.controls['crossDockAddress'].clearValidators();
      this.bolForm.controls['crossDockAddress'].disable();
      this.bolForm.controls['crossDockAddress'].patchValue(null)
      // this.bolForm.controls['crossDockAddress'].setValidators(Validators.required)
      this.bolForm.controls['crossDockAddress'].updateValueAndValidity();
    }
  }

  getBolDetails(bolId) {
    this.spinner.show();
    this.bolService.getBolDetails(bolId).subscribe(
      data => {
        //console.log('data', data)
        this.fillBolForm(data);
        if (data.deliveryLocation.locationName == 'CrossDock') {
          this.bolForm.controls['crossDockAddress'].clearValidators();
          this.bolForm.controls['crossDockAddress'].enable();
          this.bolForm.controls['crossDockAddress'].setValidators(Validators.required)
          this.bolForm.controls['crossDockAddress'].updateValueAndValidity();
        } else {
          this.bolForm.controls['crossDockAddress'].clearValidators();
          this.bolForm.controls['crossDockAddress'].disable();
          this.bolForm.controls['crossDockAddress'].patchValue(null)
          // this.bolForm.controls['crossDockAddress'].setValidators(Validators.required)
          this.bolForm.controls['crossDockAddress'].updateValueAndValidity();
        }
        this.spinner.hide();
      },
      err => {
        // //console.log(err);
        this.errorMsg = err
        this.spinner.hide();
      }
    );
  }

  fillBolForm(bol) {
    //console.log(bol)
    this.bolForm.reset();
    this.items = bol.bolItems;
    this.bolForm.patchValue({
      bolId: bol.bolId,
      bolNumber: bol.bolNumber,
      externalBol: bol.externalBol,
      requesterId: bol.requesterId,
      recipient: bol.recipient,
      expidate: bol.expidate,
      submitted: bol.submitted,
      submittedDate: bol.submittedDate,
      canceled: bol.canceled,
      canceledDate: bol.canceledDate,
      completed: bol.completed,
      space: bol.space,
      userComment: bol.userComment,
      dispatcherComment: bol.dispatcherComment,
      deliveryLocation: bol.deliveryLocation.locationId, //{locationId:bol.deliveryLocation.locationId,locationName: bol.deliveryLocation.locationName},
      pickupLocation: bol.pickupLocation.locationId,
      vehicle: bol.vehicle.vehicleId,
      cargo: bol.cargo.cargoId,
      // isCrossDock: bol.isCrossDock,
      crossDockAddress: bol.crossDockAddress
    });
    // this.deliveryLocation.reset(bol.deliveryLocation["locationName"]);
    // this.ploc( bol.pickupLocation.locationName);
    // this.bolForm.get('deliveryLocation').setValue(bol.deliveryLocation.locationName);
    // this.items = bol.bolItems;
    // //console.log(this.items)
    // //console.log(moment().diff(this.bolForm.controls.submittedDate.value,'hours'))
    if (this.bolForm.controls.submittedDate.value != null) {
      this.submittedHours = moment().diff(this.bolForm.controls.submittedDate.value, 'hours')
    } else {
      this.submittedHours = 0
    }
    //console.log(this.bolForm.controls['deliveryLocation'].value)

    // //console.log(this.submittedHours)
    // //console.log(moment('12-12-2018').fromNow(true))
    // if (this.bolForm.controls.bolId.value != 0) {
    //   this.getBolItems(this.bolForm.controls.bolId.value)
    // }
    // this.setAddress();
  }

  // getBolItems(bolId) {
  //   this.bolForm.controls.bolId.reset(bolId);
  //   // var b: any = {};
  //   // b = JSON.parse(localStorage.getItem("bol"));
  //   // this.items=b.bolItems
  //   this.itemService.getItems(this.bolForm.controls.bolId.value).subscribe(
  //     data => {
  //       this.items = data
  //     },
  //     (err: any) => (this.errorMsg = err)
  //   );
  // }


  isExternalBol() {
    //console.log(this.bolForm.get('externalBol').value)
    const ext = this.bolForm.get('externalBol').value

    if (ext) {
      this.bolForm.get('bolNumber').clearValidators();
      this.bolForm.get('bolNumber').enable();
      // this.bolForm.get('bolNumber').patchValue(null)
      this.bolForm.get('bolNumber').setValidators(Validators.required)
      this.bolForm.get('bolNumber').updateValueAndValidity();
    } else {
      // this.bolForm.get('externalBol').patchValue(false)
      // this.bolForm.get('externalBol').disable();
      this.bolForm.get('bolNumber').clearValidators();
      this.bolForm.get('bolNumber').disable();
      // this.bolForm.get('bolNumber').patchValue(null)
      // this.bolForm.get('bolNumber').setValidators(Validators.required)
      this.bolForm.get('bolNumber').updateValueAndValidity();
    }

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

  getCargos() {
    this.spinner.show()
    this.CargoService
      .getCargos()
      .subscribe(
        data => { this.cargos = data; this.spinner.hide() },
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
  // getDateTime() {
  //   var d = new Date();
  //   return d; //.getMonth()+'/'+'/'+d.getFullYear();
  // }

  // test() {
  //   if (!this.bolForm.controls.submitted.value) {
  //     var d = moment().format("MM/DD/YYYY, h:mm:ss a");
  //     this.bolForm.controls.comment.reset(d);
  //     this.bolForm.controls.submittedDate.reset(d);
  //   } else {
  //     this.bolForm.controls.comment.reset("");
  //     this.bolForm.controls.submittedDate.reset("");
  //   }
  // }

  pushAddedItem(data) {
    //console.log(data);
    this.items.push(data);
  }

  saveBol() {


    var formValues = this.bolForm.getRawValue();
    //console.log(formValues);

    var _bol = new AddUpdateBol();
    _bol.bolId = formValues.bolId;
    _bol.bolNumber = formValues.bolNumber;
    _bol.externalBol = formValues.externalBol;
    _bol.requesterId = formValues.requesterId;
    _bol.userComment = formValues.userComment;
    _bol.dispatcherComment = formValues.dispatcherComment;
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
    _bol.cargoId = formValues.cargo;
    // _bol.isCrossDock = formValues.isCrossDock;
    _bol.crossDockAddress = formValues.crossDockAddress;

    // if (this.submitted.value) {
    //   //console.log("it is submitt")
    //   //console.log(this.submitted.value)
    //   var d = moment().format("MM/DD/YYYY, h:mm:ss a");
    //   this.submittedDate.reset(d);
    //   _bol.submitted = true;

    // } else {
    //   this.submittedDate.reset("");
    // }



    if (this.bolForm.controls.bolId.value !== 0) {
      //SignalR invoke a server method
      // this.connection.invoke('SubmitBolStatic', _bol)

      this.updateBol(_bol);


    } else {
      this.addBol(_bol);
    }
  }


  addBol(bol: any) {
    //console.log(bol)
    this.spinner.show();
    this.errorMsg = "";
    this.bolService.addBol(bol).subscribe(
      b => {
        // this.disableAddItemBtn = false;
        this.spinner.hide();
        this.bolForm.get('bolId').patchValue(b.bolId)
        if (this.bolForm.get('bolNumber').value == null) {
          this.bolForm.get('bolNumber').patchValue('EZ-' + b.bolId);
        }
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
    //console.log(bol)

    this.bolService.updateBol(bol).subscribe(
      b => {
        this.spinner.hide();
        //this.bolId.reset(b.bolId);
        //console.log(b);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

  submitBol() {
    var d = moment().format("MM/DD/YYYY, HH:mm")//moment().format("MM/DD/YYYY, h:mm:ss a");
    this.bolForm.controls.submittedDate.patchValue(d);
    this.bolForm.controls.submitted.patchValue(true);
    this.bolForm.controls.canceledDate.patchValue(null);
    this.bolForm.controls.canceled.patchValue(false)
    this.saveBol();
  }

  cancelBol() {
    //console.log("cancel bol")
    var d = moment().format("MM/DD/YYYY, HH:mm")//moment().format("MM/DD/YYYY, h:mm:ss a");
    this.bolForm.controls.submittedDate.patchValue(null);
    this.bolForm.controls.submitted.patchValue(false);
    this.bolForm.controls.canceled.patchValue(true);
    this.bolForm.controls.canceledDate.patchValue(d);
    this.connection.invoke('CancelBol', { BolId: this.bolForm.controls.bolId })
    this.saveBol();
  }


  deleteBol() {
    if (this.bolForm.controls.bolId.value == 0) return;
    this.bolService.deleteBol(this.bolForm.controls.bolId.value).subscribe(
      b => {
        this.spinner.hide();
        this.toastr.success("Bol is deleted successfuly!");
        this.ngOnInit();

        // this.router.navigate(["/addbol"]);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

  showDeleteItemModal(itemId, idx) {
    this.itemId = itemId;
    this.idx = idx;
  }

  deleteItem() {
    this.spinner.show();
    this.itemService.deleteItem(this.itemId).subscribe(
      b => {
        this.spinner.hide();
        this.items.splice(this.idx, 1);
        this.toastr.success("Item is deleted successfuly!");
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
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
