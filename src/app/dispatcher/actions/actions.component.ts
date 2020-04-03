import { Component, OnInit, Input, OnDestroy, Inject, ViewChild } from '@angular/core';
import { DriversService } from 'src/app/Services/drivers.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EzDriver } from 'src/app/models/ezDriver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BolService } from 'src/app/Services';
import * as moment from "moment";
import * as momentTz from 'moment-timezone';


import { SignalR, SignalRConnection, IConnectionOptions, BroadcastEventListener } from 'ng2-signalr';
import { JQ_TOKEN } from 'src/app/common';

@Component({
  selector: 'ez-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit, OnDestroy {
  // @ViewChild('dayPicker') datePicker: DatePickerComponent;
  selectedDate: any
  drivers: EzDriver[] = [];
  errorMsg: any;
  actionsForm: FormGroup;
  defaultTime: any
  bol: any
  _bol: any
  signalrErrMsgs: any[] = []

  _bolId: any
  @Input()
  set bolId(val: any) {
    //console.log('val', val)
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
    private spinner: NgxSpinnerService,
    @Inject(JQ_TOKEN) private $: any
  ) {
    this.getDrivers()

  }

  ngOnInit() {


    this.actionsForm = this.fb.group({
      dispatchTime: null,
      driver: null,
      userComment: [{ value: null, disabled: true }],
      dispatcherComment: [{ value: null }],
      canceled: false,
      canceledDate: null,
      completed: false,
      completedDate: null,
      receivedBy: null,
      receivedDate: null,
      receivedAtLocation: null,
      pickupArrival: null,
      pickupArrivalDate: null,
      pickupDeparture: null,
      pickupDepartureDate: null,
      deliveryArrival: false,
      deliveryArrivalDate: null,
      crossDockAddress: [{ value: null, disabled: true }],
      submittedDate: null
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

  getDefaultTime(ctrlName) {
    // var md = moment.utc()
    // var date = new Date()
    //var stillUtc = moment.utc().toDate();
    
    var dateTime = moment().format("MM/DD/YYYY, HH:mm"); //moment(stillUtc).format('YYYY-MM-DDThh:mm');

    Object.keys(this.actionsForm.controls).forEach(key => {
      if (key === ctrlName) {
        this.actionsForm.controls[ctrlName].setValue(dateTime)
      }
    });

  }
  ngOnDestroy() {
    // this.connection.stop();
    this.signalrEditBol('unlock')
  }

  signalrConnect() {

    //console.log('connection is started')
    // subscribe for incoming messages
    this.bolListener.subscribe(bol => {

      // this.bols.push(_bol);

      //console.log('bol from the signalr', bol)
    });

    // listen for connection errors
    this.connection.errors.subscribe((error: any) => {
      this.signalrErrMsgs.push(error);
    });
  }



  fillTheForm() {
    this.actionsForm.reset();
    this.actionsForm.patchValue({
      dispatchTime: this.bol.dispatchTime,
      driver: this.bol.driverId,
      completed: this.bol.completed,
      completedDate: this.bol.completedDate,
      canceled: this.bol.canceled,
      canceledDate: this.bol.canceledDate,
      userComment: this.bol.userComment,
      dispatcherComment: this.bol.dispatcherComment,
      receivedBy: this.bol.receivedBy,
      receivedDate: this.bol.receivedDate,
      receivedAtLocation: this.bol.receivedAtLocation,
      // pickupArrival: this.bol.pickupArrival,
      pickupArrivalDate: this.bol.pickupArrivalDate,
      // pickupDeparture: this.bol.pickupDeparture,
      pickupDepartureDate: this.bol.pickupDepartureDate,
      // deliveryArrival: this.bol.deliveryArrival,
      deliveryArrivalDate: this.bol.deliveryArrivalDate,
      crossDockAddress: this.bol.crossDockAddress,
      submittedDate: this.bol.submittedDate
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
    //console.log('Action form - signalr edit bol invoke', editInfo)
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
        //console.log('getBolById', data);
        this.bol = data;
        this._bol = data;
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      },
      () => {
        this.fillTheForm()
      }
    )
  }


  getDrivers() {
    this.driverService.getDrivers().subscribe(
      data => {
        this.spinner.hide();
        this.drivers = data;
        //console.log(data);
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

  //   //console.log('assignDriver ', bol)
  // }

  cancelBol() {
    var d = moment().format("MM/DD/YYYY, HH:mm")// moment().format("MM/DD/YYYY, h:mm:ss a");

    if (this.actionsForm.controls.canceled.value) {
      this.actionsForm.patchValue({
        canceled: true,
        canceledDate: d,
        completed: false,
        completedDate: null
      })
    } else {
      this.actionsForm.patchValue(
        {
          canceled: false,
          canceledDate: null,
          completed: this._bol.completed,
          completedDate: this._bol.completedDate,
        }
      )
    }
  }



  completedBol() {
    //console.log("complete bol", this.bol)
    var _bol = this.bol;
    var d = moment().format("MM/DD/YYYY, HH:mm") //moment().format("MM/DD/YYYY, h:mm:ss a");
    if (this.actionsForm.controls.completed.value) {
      this.actionsForm.patchValue({
        canceled: false,
        canceledDate: null,
        completed: true,
        completedDate: d
      })
    } else {
      this.actionsForm.patchValue({
        canceled: this._bol.canceled,
        canceledDate: this._bol.canceledDate,
        completed: false,
        completedDate: null
      })
    }
  }


  saveChanges() {
    var d = moment().format("MM/DD/YYYY, HH:mm")// moment().format("MM/DD/YYYY, h:mm:ss a");

    this.bol.pickupArrivalDate = this.actionsForm.controls.pickupArrivalDate.value
    this.bol.pickupDepartureDate = this.actionsForm.controls.pickupDepartureDate.value
    this.bol.dispatchTime = this.actionsForm.controls.dispatchTime.value
    this.bol.deliveryArrivalDate = this.actionsForm.controls.deliveryArrivalDate.value

    this.bol.driverId = this.actionsForm.controls.driver.value
    this.bol.receivedBy = this.actionsForm.controls.receivedBy.value
    this.bol.dispatchTime = this.actionsForm.controls.dispatchTime.value
    this.bol.receivedDate = this.actionsForm.controls.receivedDate.value

    this.bol.canceled = this.actionsForm.controls.canceled.value
    this.bol.canceledDate = this.actionsForm.controls.canceledDate.value
    this.bol.completed = this.actionsForm.controls.completed.value
    this.bol.completedDate = this.actionsForm.controls.completedDate.value

    this.bol.dispatcherComment = this.actionsForm.controls.dispatcherComment.value

    // this.bol.deliveryLocationId = this.bol.deliveryLocation.locationId;
    // this.bol.pickupLocationId = this.bol.pickupLocation.locationId;
    // this.bol.vehicleId = this.bol.vehicle.vehicleId
    // this.bol.cargoId = this.bol.cargo.cargoId

    if (this.actionsForm.controls.canceled.value) {
      this.bol.submittedDate = null
      this.bol.submitted = false
    }

    //console.log(this.bol)
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
        //console.log(b);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );

  }




  // //console.log(this.selectedBols)



}
