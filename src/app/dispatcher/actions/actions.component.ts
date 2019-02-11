import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DriversService } from 'src/app/Services/drivers.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EzDriver } from 'src/app/models/ezDriver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BolService } from 'src/app/Services';
import * as moment from "moment";

import { SignalR, SignalRConnection, IConnectionOptions, BroadcastEventListener } from 'ng2-signalr';

@Component({
  selector: 'ez-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit, OnDestroy {
  drivers: EzDriver[] = [];
  errorMsg: any;
  actionsForm: FormGroup;
  bol: any
  _bol: any
  signalrErrMsgs: any[] = []

  _bolId: any
  @Input()
  set bolId(val: any) {
    console.log('val', val)
    if (val != null || val != undefined) {
      this._bolId = val
      this.getBolById(this._bolId)
      // this.fillTheForm()

    }

    // this.fillTheForm(this._bolId);
  }
  get bolId() {

    return this._bolId
  }


  //1. create connection
  connection = this._signalR.createConnection();
  // 2.create a listener object
  bolListener = new BroadcastEventListener<any>('CancelBol');
  editListener = new BroadcastEventListener<boolean>('editBol');

  constructor(
    private _signalR: SignalR,
    private fb: FormBuilder,
    private bolService: BolService,
    private driverService: DriversService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getDrivers()

    this.actionsForm = this.fb.group({
      driver: null,
      comment: null,
      cancelBol: false,
      completed: false,
      receivedBy: null,
      receivedDate: null,
      receivedAtLocation: null,
      pickupArrival: null,
      pickupArrivalDate: null,
      pickupDeparture: null,
      pickupDepartureDate: null,
      deliveryArrival: false,
      deliveryArrivalDate: null,
    })

    //3. start connection
    this.connection.start();
    // when user refresh the page we need to unlock the row
    window.onbeforeunload = () => {
      // if (this._bolId!=null) {
      this.signalrEditBol('unlock')
      // } else {
      //   // Do nothing!
      //   return false;
      // }
    }

  }

  ngOnDestroy() {
    // this.connection.stop();
    this.signalrEditBol('unlock')
  }

  signalrConnect() {

    console.log('connection is started')
    // subscribe for incoming messages
    this.bolListener.subscribe(bol => {

      // this.bols.push(_bol);

      console.log('bol from the signalr', bol)
    });

    // listen for connection errors
    this.connection.errors.subscribe((error: any) => {
      this.signalrErrMsgs.push(error);
    });
  }



  fillTheForm() {

    this.actionsForm.reset();
    this.actionsForm.patchValue({
      driver: this.bol.driverId,
      completed: this.bol.completed,
      cancelBol: this.bol.cancelBol,
      comment: this.bol.comment,
      receivedBy: this.bol.receivedBy,
      receivedDate: this.bol.receivedDate,
      receivedAtLocation: this.bol.receivedAtLocation,
      pickupArrival: this.bol.pickupArrival,
      pickupArrivalDate: this.bol.pickupArrivalDate,
      pickupDeparture: this.bol.pickupDeparture,
      pickupDepartureDate: this.bol.pickupDepartureDate,
      deliveryArrival: this.bol.deliveryArrival,
      deliveryArrivalDate: this.bol.deliveryArrivalDate,


    });
    // this.signalrConnect();
    // this.signalrEditBol(true)

  }

  signalrEditBol(bolStatus: string) {
    var user = JSON.parse(localStorage.getItem('userInfo'))

    //SignalR invoke a server method
    var editInfo = {
      bolId: this._bolId,
      // bol: this.bol,
      editByUser: user.firstName + ' ' + user.lastName,
      bolStatus: bolStatus,
    }
    console.log('Action form - signalr edit bol invoke', editInfo)
    this.connection.invoke('EditBol', editInfo)
  }

  dismissModal() {
    this.signalrEditBol('unlock')
  }

  getBolById(bolId) {
    this.spinner.show()
    this.bolService.getBolDetails(bolId).subscribe(
      data => {
        this.spinner.hide();
        console.log('getBolById', data);
        this.bol = data;
        this._bol = data;
        this.fillTheForm()
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }


  getDrivers() {
    this.driverService.getDrivers().subscribe(
      data => {
        this.spinner.hide();
        this.drivers = data;
        console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

  // assignDriver(bol) {
  //   // bol.driver = this.actions.driver;
  //   // this.bol.driverId=this.actionsForm.controls.driverId

  //   console.log('assignDriver ', bol)
  // }

  cancelBol() {
    console.log(this.bol)
    // var _bol=this.bol;//keep a copy

    var d = moment().format("MM/DD/YYYY, h:mm:ss a");
    if (this.actionsForm.controls.cancelBol.value) {
      this.actionsForm.controls.completed.patchValue(false)
      this.bol.canceled = true;
      this.bol.canceledDate = d;
      this.bol.submittedDate = null;
      this.bol.submitted = false;
      this.bol.completed = false;
      this.bol.completedDate = null;

    } else {
      this.bol.canceled = false;
      this.bol.canceledDate = null;
      // this.bol.submittedDate = _bol.submittedDate;
      // this.bol.submitted = _bol.submitted;
      // this.bol.completed = _bol.completed;
      // this.bol.completedDate = _bol.completedDate;
    }
  }

  pickedup() {

    var d = moment().format("MM/DD/YYYY, h:mm:ss a");
    if (this.actionsForm.controls.pickupArrival.value) {
      this.bol.pickupArrival = true;
      this.bol.pickupArrivalDate = (this.bol.pickupArrivalDate == null ? d : this._bol.pickupArrivalDate);
    } else {
      this.bol.pickupArrival = false;
      this.bol.pickupArrivalDate = null;
    }
    // console.log(this.actionsForm.controls.pickupArrival.value)
  }

  Delivered() {
    var d = moment().format("MM/DD/YYYY, h:mm:ss a");
    this.bol.Delivered = true
    this.bol.DeliveredDate = d
  }

  completeBol() {
    console.log("complete bol", this.bol)
    var _bol = this.bol;
    var d = moment().format("MM/DD/YYYY, h:mm:ss a");
    if (this.actionsForm.controls.completed.value) {
      this.actionsForm.controls.cancelBol.patchValue(false)
      this.bol.completed = true;
      this.bol.completedDate = this.bol.completedDate === '' ? _bol.completedDate : d;
      this.bol.canceled = false;
      this.bol.canceledDate = null;
    } else {
      this.bol.completed = false;
      this.bol.completedDate = null;
    }
  }

  // actionFormValues() {
  //   console.log("cancel bol", this.actionsForm.controls.driver.value)
  //   var d = moment().format("MM/DD/YYYY, h:mm:ss a");

  //   if (this.actionsForm.controls.cancelBol.value) {
  //     this._bol.canceled = true;
  //     this._bol.canceledDate = d;
  //     this.bol.submittedDate = null;
  //     this.bol.submitted = false;
  //   } else {
  //     this.bol.canceled = false;
  //     this.bol.canceledDate = null;
  //   }

  //   if (this.actionsForm.controls.completed.value) {
  //     this.bol.submittedDate = d;
  //     this.bol.submitted = true;
  //     this.bol.canceled = false;
  //     this.bol.canceledDate = null;
  //   } else {
  //     this.bol.submittedDate = null;
  //     this.bol.submitted = false;
  //   }

  //   this.bol.driverId = this.actionsForm.controls.driver.value;
  //   this.bol.deliveryLocationId = this.bol.deliveryLocation.locationId;
  //   this.bol.pickupLocationId = this.bol.pickupLocation.locationId;
  //   this.bol.vehicleId = this.bol.vehicle.vehicleId
  //   this.bol.cargoId = this.bol.cargo.cargoId
  // }

  saveChanges() {
    var d = moment().format("MM/DD/YYYY, h:mm:ss a");
    if (this.actionsForm.controls.pickupArrival.value) {
      this.bol.pickupArrival = true;
      this.bol.pickupArrivalDate = (this.bol.pickupArrivalDate == null ? d : this._bol.pickupArrivalDate);
    } else {
      this.bol.pickupArrival = false;
      this.bol.pickupArrivalDate = null;
    }

    if (this.actionsForm.controls.completed.value) {
      this.actionsForm.controls.cancelBol.patchValue(false)
      this.bol.completed = true;
      this.bol.completedDate = this.bol.completedDate === '' ? this._bol.completedDate : d;
      this.bol.canceled = false;
      this.bol.canceledDate = null;
    } else {
      this.bol.completed = false;
      this.bol.completedDate = null;
    }

    this.bol.driverId = this.actionsForm.controls.driver.value
    this.bol.receivedBy = this.actionsForm.controls.receivedBy.value
    // this.bol.deliveryLocationId = this.bol.deliveryLocation.locationId;
    // this.bol.pickupLocationId = this.bol.pickupLocation.locationId;
    // this.bol.vehicleId = this.bol.vehicle.vehicleId
    // this.bol.cargoId = this.bol.cargo.cargoId
    this.bol.comment = this.actionsForm.controls.comment.value
    console.log(this.bol)
    this.errorMsg = "";
    this.spinner.show();
    if (this.bol.completed || this.bol.canceled) {
      this.signalrEditBol('remove')
    }
    // unlock the bol after finish editing

    this.bolService.actionsUpdate(this.bol).subscribe(
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




  // console.log(this.selectedBols)



}
