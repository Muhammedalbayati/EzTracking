import { Component, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocationsService } from 'src/app/Services';

@Component({
  selector: 'ez-addbuilding',
  templateUrl: './addbuilding.component.html',
  styleUrls: ['./addbuilding.component.css']
})
export class AddbuildingComponent implements OnInit {

  buildingForm: FormGroup;
  errorMsg: any;
  bldg: any = {}

  constructor(
    private locationService: LocationsService,
    private fb: FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.buildingForm = this.fb.group({
      locationId: [{ value: null, disabled: true }],
      locationName: [null, [Validators.required]],
      building: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
    })
  }


  fillBuildingForm(bldg) {
    this.buildingForm.reset();
    this.buildingForm.patchValue({
      locationId: bldg.locationId,
      locationName: bldg.locationName,
      building: bldg.building,
      address: bldg.address,
      city: bldg.city,
      phone: bldg.phone,
      state: bldg.state,
      zip: bldg.zip,
    })

  }

  onBuildingRowClicked(data: any) {
    //console.log(data)
    if (data === null || data === undefined) {
      return
    }
    this.fillBuildingForm(data)
  }

  saveClick() {
    if (this.buildingForm.controls.locationId.value !== null || this.buildingForm.controls.locationId.value != undefined) {
      //console.log('update')
      this.updateBldg()
    } else {
      //console.log('new')
      this.addBldg()
    }
  }

  updateBldg() {
    this.errorMsg = ""
    this.spinner.show()
    this.locationService.updateBulding(this.buildingForm.getRawValue()).subscribe(
      d => {
        //console.log(d)
        this.toastr.success('UPDATED')
        this.bldg = d
        // this.buildingForm.patchValue({
        //   bldgId: dcontrols.locationId,
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


  addBldg() {
    this.errorMsg = ""
    this.spinner.show()
    this.locationService.addBuilding(this.buildingForm.value).subscribe(
      d => {
        this.buildingForm.patchValue({
          bldgId: d.locationId,
          signUpDate: d.signUpDate
        })
        this.bldg = d
        this.toastr.success('ADDED')
      }, (err: any) => {
        this.spinner.hide()
        this.errorMsg = err;
      },
      () => {

        this.spinner.hide()

      })
  }
  
  clearFrom(){
    this.buildingForm.reset();
  }

  deleteBuilding() {
    if (this.buildingForm.controls.locationId.value == 0) return;
    this.locationService.deleteBulding(this.buildingForm.controls.locationId.value).subscribe(
      d => {
        this.spinner.hide();
        this.toastr.success("bldg is deleted successfuly!");
        this.ngOnInit();
        this.bldg = d
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
