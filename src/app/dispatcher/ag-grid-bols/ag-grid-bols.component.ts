import { Component, OnInit, Inject } from '@angular/core';
import { Bol } from 'src/app/models/bol';
import { BroadcastEventListener, SignalR } from 'ng2-signalr';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { BolService } from 'src/app/Services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ez-ag-grid-bols',
  templateUrl: './ag-grid-bols.component.html',
  styleUrls: ['./ag-grid-bols.component.css']
})
export class AgGridBolsComponent implements OnInit {

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



   gridApi;
   gridColumnApi;

   columnDefs;
   rowSelection;
   rowData: any[] = [];


  @Inject(TOASTR_TOKEN)
  private toastr: Toastr;


  constructor(

    private _signalR: SignalR,
    private bolService: BolService,
    private spinner: NgxSpinnerService
  ) {

    this.columnDefs = [

      { headerName: 'bolNumber', field: 'bolNumber', pinned: 'left' },
      { headerName: 'requesterId', field: 'requesterId' },


      { headerName: 'submittedDate', field: 'submittedDate' },
      { headerName: 'cargo', field: 'cargo.cargoType' },
      { headerName: 'pickupLocation', field: 'pickupLocation.locationName' },
      { headerName: 'deliveryLocation', field: 'deliveryLocation.locationName' },
      { headerName: 'userComment', field: 'userComment' },
      { headerName: 'vehicle', field: 'vehicle.vehicleType' },
      { headerName: 'expidate', field: 'expidate' },
      { headerName: 'items', field: 'bolItems.length' },
      { headerName: 'driver', field: 'driver.firstName' }, // driver.lastName
      {
        headerName: 'driver',

        children: [
          { headerName: 'First Name', field: 'driver.firstName' },
          { headerName: 'Last Name', field: 'driver.lastName' },
        ]

      }, // driver.lastName
      { headerName: 'userComment', field: 'userComment' },

    ];

    this.rowSelection = "single";

  }

  ngOnInit() {

    this.spinner.show();
    // this.getBols();
  }



  gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      
    },
    columnDefs: this.columnDefs,
    showToolPanel: true,
    
    // rowSelection: 'multiple',

    // onSelectionChanged: this.onSelectionChanged(),
  }


  onSelectionChanged() {
    this.showDetails()
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.bolNumber;
    });
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit()
    this.gridColumnApi = params.columnApi;

    this.bolService.getBols(true, false).subscribe(
      data => {
        this.spinner.hide();
        this.bols = data;
        this.rowData = data
        //console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );

  }

  showDetails() {
    //console.log('showDetails')
  }

}

/*
assginToDriverDate: null
bolId: 22
bolItems: [{…}]
bolNumber: "EZ-22"
canceled: false
canceledDate: null
cargo: {$id: "5", cargoId: 2, cargoType: "Day1"}
comment: "hiii"
completed: false
completedDate: null
createdDate: "2019-01-30T14:20:52.24"
crossDockAddress: null
deliveryArrival: false
deliveryArrivalDate: null
deliveryLocation: {$id: "3", locationId: 2, locationName: "45R", building: "B45", address: "810 Hoard Ln", …}
dispatcherId: null
driver: null
driverId: null
expidate: false
externalBol: false
pickupArrival: false
pickupArrivalDate: null
pickupDeparture: false
pickupDepartureDate: null
pickupLocation: {$id: "4", locationId: 1, locationName: "30S", building: "B30", address: "9700 E-290", …}
receivedAtLocationId: null
receivedBy: null
receivedDate: null
recipient: "Mustafa"
requesterId: "dEzTrackingDispatcherX123"
space: 2
submitted: true
submittedDate: "2019-02-10T13:50:04"
vehicle:
*/