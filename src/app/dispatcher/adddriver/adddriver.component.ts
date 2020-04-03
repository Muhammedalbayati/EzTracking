import { Component, OnInit, Inject, Input } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { DriversService } from 'src/app/Services/drivers.service';
import { EzDriver } from 'src/app/models/ezDriver';

@Component({
  selector: 'ez-adddriver',
  templateUrl: './adddriver.component.html',
  styleUrls: ['./adddriver.component.css']
})
export class AdddriverComponent implements OnInit {
  driverForm: FormGroup;
  errorMsg: any;
  ezDriver: any={}

  constructor(
    private driverService: DriversService,
    private fb: FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.driverForm = this.fb.group({
      driverId: [{ value: null, disabled: true }],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: null,
      email: null,
      shift: [null, [Validators.required]],
      signUpDate: [{ value: null, disabled: true }],
      active: true,//[{ value: true }]
    })
  }


  fillDriverForm(ezDriver) {
    this.driverForm.reset();
    this.driverForm.patchValue({
      driverId: ezDriver.driverId,
      firstName: ezDriver.firstName,
      lastName: ezDriver.lastName,
      phoneNumber: ezDriver.phoneNumber,
      email: ezDriver.email,
      shift: ezDriver.shift,
      signUpDate: ezDriver.signUpDate,
      active: ezDriver.active,
    })

  }

  onDriverRowClicked(data: any) {
    ////console.log(data)
    if (data === null || data === undefined) {
      return
    }
    this.fillDriverForm(data)
  }

  saveClick() {
    if (this.driverForm.controls.driverId.value !== null || this.driverForm.controls.driverId.value != undefined) {
      ////console.log('update')
      this.updateDriver()
    } else {
      ////console.log('new')
      this.addDriver()
    }
  }

  updateDriver() {
    this.errorMsg = ""
    this.spinner.show()
    this.driverService.updateDriver(this.driverForm.getRawValue()).subscribe(
      d => {
        // ////console.log(d)
        this.toastr.success('UPDATED')
        this.ezDriver = d
        // this.driverForm.patchValue({
        //   driverId: d.driverId,
        //   signUpDate:d.signUpDate
        // })
      }, (err: any) => {
        this.spinner.hide()
        this.errorMsg = err;
      },
      () => {

        this.spinner.hide()
      })
  }


  addDriver() {
    this.errorMsg = ""
    this.spinner.show()
    this.driverService.addDriver(this.driverForm.value).subscribe(
      d => {
        this.driverForm.patchValue({
          driverId: d.driverId,
          signUpDate: d.signUpDate
        })
        this.ezDriver = d
        this.toastr.success('ADDED')
      }, (err: any) => {
        this.spinner.hide()
        this.errorMsg = err;
      },
      () => {

        this.spinner.hide()

      })
  }

  deleteDriver() {
    if (this.driverForm.controls.driverId.value == 0) return;
    this.driverService.deleteDriver(this.driverForm.controls.driverId.value).subscribe(
      d => {
        this.spinner.hide();
        this.toastr.success("Driver is deleted successfuly!");
        this.ngOnInit();
        this.ezDriver = d
        // this.router.navigate(["/addbol"]);
      },
      (err: any) => {
        this.errorMsg = err;
      }, () => {
        this.spinner.hide();
      }
    );
  }




}
