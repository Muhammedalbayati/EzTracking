import { Component, OnInit, Inject, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common/toastr.service';
import { BolService } from 'src/app/Services';
import { Bol } from 'src/app/models/bol';
import { NgxSpinnerService } from 'ngx-spinner';

import { SignalR, SignalRConnection, IConnectionOptions, BroadcastEventListener } from 'ng2-signalr';
import { AddUpdateBol } from 'src/app/models/addUpdateBol';
import { BolUpdate } from 'src/app/models/bolUpdate';
import * as $ from 'jquery';
import { filter } from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'ez-bol-requests',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bol-requests.component.html',
  styleUrls: ['./bol-requests.component.css']
})
export class BolRequestsComponent implements OnInit {
  // selectedBols: any[] = [] //// This for multipule selections 
  filterBy: string
  filteredBols: any[] = []

  bols: any[] = [];
  selectedBolId: Bol;
  errorMsg;
  signalrErrMsgs: any[] = []
  //1. create connection
  connection = this._signalR.createConnection();
  // 2.create a listener object
  bolListener = new BroadcastEventListener<any>('NewBol');
  editBolListener = new BroadcastEventListener<any>('EditBol');
  getAllBolListener = new BroadcastEventListener<any>('GetAllBolsInfo');


  lockedByArray: any[] = []
  bolsLockedArray: any[] = []


  @Inject(TOASTR_TOKEN)
  private toastr: Toastr;


  constructor(

    private _signalR: SignalR,
    private bolService: BolService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.spinner.show();
    this.getBols();
    // this.connection = this._signalR.createConnection();
    // this.bolListener= new BroadcastEventListener<Bol>('NewBol');
    //3. start connection
    this.connection.start().then(() => {
      this.connection.invoke('getAllBolsInfo')
    });
    // register the listener
    this.connection.listen(this.bolListener);
    this.connection.listen(this.editBolListener);
    this.connection.listen(this.getAllBolListener);

    this.newBolListenerSubscriber();
    this.EditBolListenerSubscriber();
    this.getAllBolsInfoListenerSubscriber();


  }


  //   ngAfterViewInit(): void {
  //     // ($('#one') as any).selectable();
  // }

  getAllBolsInfoListenerSubscriber() {
    this.getAllBolListener.subscribe(editInfoList => {
      editInfoList.forEach(b => {
        this.bolsLockedArray.push(b.bolId)
        this.lockedByArray.push(b)
      });

    })
  }

  // filterData() {
  //   this.bols.forEach(b =>

  //     // b.bolNumber.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.userId.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.submittedDate.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.pickupLocation.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.deliveryLocation.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.vehicleType.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.userComment.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.disp.Comment.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.submitted.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.expidate.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.itmes.toLocaleLowerCase().indexOf(this.filterBy) !== -1
  //     // || b.driver.driverName.toLocaleLowerCase().indexOf(this.filterBy) !== -1

  //     // Object.entries(b).forEach(o => {
  //     //   //console.log(o)
  //     // })

  //     // Object.entries(b).forEach(([key, val]) => {
  //     //   // //console.log(key);          // the name of the current key.
  //     //   // //console.log(val);          // the value of the current key.
  //     // if (key.toLocaleLowerCase().indexOf(this.filterBy) !== -1) {
  //     //   //console.log(key);
  //     //   //console.log(val);
  //     // }
  //     // })


  //     Object.keys(b).forEach(key => {
  //       // //console.log(key, b[key])
  //       // //console.log(key, b[key])
  //       if (b[key].toLocaleLowerCase().indexOf(this.filterBy) !== -1) {
  //         //console.log(b[key]);
  //       }

  //     })

  //   )
  // }







  EditBolListenerSubscriber() {

    // subscribe for incoming messages
    this.editBolListener.subscribe(editInfo => {


      if (editInfo.bolStatus == 'lock') {
        this.bolsLockedArray.push(editInfo.bolId)
        this.lockedByArray.push(editInfo)
      } else {
        const index = this.bolsLockedArray.indexOf(editInfo.bolId);
        if (editInfo.bolStatus == 'remove') {
          const r = this.bols.indexOf(editInfo.bolId);
          this.bols.splice(r)
        } else {
          this.bolsLockedArray.splice(index, 1);
          this.lockedByArray.splice(index, 1)
        }
      }
      this.strikeoutLine(editInfo.bolId)
    });

    // listen for connection errors
    this.connection.errors.subscribe((error: any) => {
      this.signalrErrMsgs.push(error);
    });
  }


  getEditInfo(bolId) {

    if (bolId !== null || bolId !== undefined) {
      var u = this.lockedByArray.find(x => x.bolId === bolId)
      // //console.log('get edit info', u)
      return u
    } else {
      return null
    }


  }

  strikeoutLine(bolId) {
    if (this.bolsLockedArray.indexOf(bolId) !== -1) {
      return true
    } else {
      return false
    }
  }

  dismissModal() {
    var editInfo = {
      bolId: this.selectedBolId,
      // bol: this.bol,
      editByUser: null,
      bolStatus: 'unlock',
    }
    this.connection.invoke('EditBol', editInfo)
  }

  newBolListenerSubscriber() {
    // subscribe for incoming messages
    this.bolListener.subscribe(bol => {
      this.bols.push(bol)
    });

    // listen for connection errors
    this.connection.errors.subscribe((error: any) => {
      this.signalrErrMsgs.push(error);
    });
  }

  getBols() {
    this.bolService.getBols(true, false).subscribe(
      data => {
        this.spinner.hide();
        this.bols = data;
        this.filteredBols = this.bols;
        // //console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );

  }


  handleSelectedBol(bol) {
    // //console.log(bol)
    var user = JSON.parse(localStorage.getItem('userInfo'))

    var editInfo = {
      bolId: bol.bolId,
      // bol: this.bol,
      editByUser: user.firstName + ' ' + user.lastName,
      bolStatus: 'lock',
    }
    this.connection.invoke('EditBol', editInfo)
    this.selectedBolId = bol.bolId
  }

  //// This for multipule selections 
  // handleSelectedBols(bolId) {
  //   var _bol = { bolId: bolId }
  //   var idx = this.selectedBols.findIndex(bol => bol.bolId === _bol.bolId);

  //   if (idx == -1) {
  //     this.selectedBols.push(_bol)
  //   } else {
  //     this.selectedBols.splice(idx, 1)
  //   }

  //   //console.log(this.selectedBols)
  // }



}

