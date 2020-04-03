import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehiclesService } from 'src/app/Services';

@Component({
  selector: 'ez-vehicleslist',
  templateUrl: './vehicleslist.component.html',
  styleUrls: ['./vehicleslist.component.css']
})
export class VehicleslistComponent implements OnInit {
  vehicles: any = []
  errorMsg: any
  _vehicle: any = {}
  @Input()
  set vehicle(val: any) {
    //console.log('val', val)
    if (val != null || val != undefined) {
      this._vehicle = val
    }
  }
  get vehicle() {
    return this._vehicle
  }

  @Output() selectedVehicle = new EventEmitter();


  constructor(
    private vehicleService: VehiclesService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getvehicles();
  }

  onRowClick(data) {
    // //console.log(data)
    this.selectedVehicle.emit(data)

  }



  getvehicles() {
    this.spinner.show();
    this.vehicleService.getVehicles().subscribe(
      data => {
        this.spinner.hide();
        this.vehicles = data;
        //console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

}
