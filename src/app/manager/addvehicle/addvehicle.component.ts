import { Component, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehiclesService } from 'src/app/Services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ez-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  errorMsg: any;
  vehicle: any={}

  constructor(
    private vehicleService: VehiclesService,
    private fb: FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      vehicleId: [{ value: null, disabled: true }],
      vehicleType: [null, [Validators.required]],
    })
  }


  fillvehicleForm(vehicle) {
    this.vehicleForm.reset();
    this.vehicleForm.patchValue({
      vehicleId: vehicle.vehicleId,
      vehicleType: vehicle.vehicleType,

    })

  }

  onVehicleRowClicked(data: any) {
    //console.log(data)
    if (data === null || data === undefined) {
      return
    }
    this.fillvehicleForm(data)
  }

  saveClick() {
    if (this.vehicleForm.controls.vehicleId.value !== null || this.vehicleForm.controls.vehicleId.value != undefined) {
      //console.log('update')
      this.updateVehicle()
    } else {
      //console.log('new')
      this.addVehicle()
    }
  }

  clearFrom(){
    this.vehicleForm.reset();
  }


  updateVehicle() {
    this.errorMsg = ""
    this.spinner.show()
    this.vehicleService.updateVehicle(this.vehicleForm.getRawValue()).subscribe(
      d => {
        // //console.log(d)
        this.toastr.success('UPDATED')
        this.vehicle = d
        // this.vehicleForm.patchValue({
        //   vehicleId: d.vehicleId,
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


  addVehicle() {
    this.errorMsg = ""
    this.spinner.show()
    this.vehicleService.addVehicle(this.vehicleForm.value).subscribe(
      d => {
        this.vehicleForm.patchValue({
          vehicleId: d.vehicleId,
        })
        this.vehicle = d
        this.toastr.success('ADDED')
      }, (err: any) => {
        this.spinner.hide()
        this.errorMsg = err;
      },
      () => {

        this.spinner.hide()

      })
  }

  deleteVehicle() {
    if (this.vehicleForm.controls.vehicleId.value == 0) return;
    this.vehicleService.deleteVehicle(this.vehicleForm.controls.vehicleId.value).subscribe(
      d => {
        this.spinner.hide();
        this.toastr.success("Vehicle is deleted successfuly!");
        this.ngOnInit();
        this.vehicle = d
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
