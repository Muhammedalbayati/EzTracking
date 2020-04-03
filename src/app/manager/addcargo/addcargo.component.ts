import { Component, OnInit, Inject, Input } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CargoService } from 'src/app/Services';

@Component({
  selector: 'ez-addcargo',
  templateUrl: './addcargo.component.html',
  styleUrls: ['./addcargo.component.css']
})
export class AddcargoComponent implements OnInit {
  cargoForm: FormGroup;
  errorMsg: any;
  cargo: any={}

  constructor(
    private cargoService: CargoService,
    private fb: FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cargoForm = this.fb.group({
      cargoId: [{ value: null, disabled: true }],
      cargoType: [null, [Validators.required]],
    })
  }


  fillcargoForm(cargo) {
    this.cargoForm.reset();
    this.cargoForm.patchValue({
      cargoId: cargo.cargoId,
      cargoType: cargo.cargoType,

    })

  }

  onCargoRowClicked(data: any) {
    //console.log(data)
    if (data === null || data === undefined) {
      return
    }
    this.fillcargoForm(data)
  }

  saveClick() {
    if (this.cargoForm.controls.cargoId.value !== null || this.cargoForm.controls.cargoId.value != undefined) {
      //console.log('update')
      this.updateCargo()
    } else {
      //console.log('new')
      this.addCargo()
    }
  }

  updateCargo() {
    this.errorMsg = ""
    this.spinner.show()
    this.cargoService.updateCargo(this.cargoForm.getRawValue()).subscribe(
      d => {
        // //console.log(d)
        this.toastr.success('UPDATED')
        this.cargo = d
        // this.cargoForm.patchValue({
        //   cargoId: d.cargoId,
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


  addCargo() {
    this.errorMsg = ""
    this.spinner.show()
    this.cargoService.addCargo(this.cargoForm.value).subscribe(
      d => {
        this.cargoForm.patchValue({
          cargoId: d.cargoId,
        })
        this.cargo = d
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
    this.cargoForm.reset();
  }

  deleteCargo() {
    if (this.cargoForm.controls.cargoId.value == 0) return;
    this.cargoService.deleteCargo(this.cargoForm.controls.cargoId.value).subscribe(
      d => {
        this.spinner.hide();
        this.toastr.success("Cargo is deleted successfuly!");
        this.ngOnInit();
        this.cargo = d
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
