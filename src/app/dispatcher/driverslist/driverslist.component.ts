import { Component, OnInit, Inject, Output, Input } from '@angular/core';
import { DriversService } from 'src/app/Services/drivers.service';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventEmitter } from '@angular/core';
import { EzDriver } from 'src/app/models/ezDriver';

@Component({
  selector: 'ez-driverslist',
  templateUrl: './driverslist.component.html',
  styleUrls: ['./driverslist.component.css']
})
export class DriverslistComponent implements OnInit {
  drivers: any = []
  errorMsg: any
  _ezDriver: any = {}
  @Input()
  set ezDriver(val: any) {
    //console.log('val', val)
    if (val != null || val != undefined) {
      this._ezDriver = val
    }
  }
  get ezDriver() {
    return this._ezDriver
  }

  @Output() selectedDriver = new EventEmitter();


  constructor(
    private driverService: DriversService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getDrivers();
  }

  onRowClick(data) {
    // //console.log(data)
    this.selectedDriver.emit(data)

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

}
