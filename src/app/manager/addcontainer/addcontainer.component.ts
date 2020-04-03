import { Component, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContainerService } from 'src/app/Services';

@Component({
  selector: 'ez-addcontainer',
  templateUrl: './addcontainer.component.html',
  styleUrls: ['./addcontainer.component.css']
})
export class AddcontainerComponent implements OnInit {
  containerForm: FormGroup;
  errorMsg: any;
  container: any = {}

  constructor(
    private containerService: ContainerService,
    private fb: FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.containerForm = this.fb.group({
      containerId: [{ value: null, disabled: true }],
      containerType: [null, [Validators.required]],
    })
  }


  clearFrom() {
    this.containerForm.reset();
  }

  fillcontainerForm(container) {
    this.containerForm.reset();
    this.containerForm.patchValue({
      containerId: container.containerId,
      containerType: container.containerType,

    })

  }

  onContainerRowClicked(data: any) {
    //console.log(data)
    if (data === null || data === undefined) {
      return
    }
    this.fillcontainerForm(data)
  }

  saveClick() {
    if (this.containerForm.controls.containerId.value !== null || this.containerForm.controls.containerId.value != undefined) {
      //console.log('update')
      this.updateContainer()
    } else {
      //console.log('new')
      this.addContainer()
    }
  }

  updateContainer() {
    this.errorMsg = ""
    this.spinner.show()
    this.containerService.updateContainer(this.containerForm.getRawValue()).subscribe(
      d => {
        // //console.log(d)
        this.toastr.success('UPDATED')
        this.container = d
        // this.containerForm.patchValue({
        //   containerId: d.containerId,
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


  addContainer() {
    this.errorMsg = ""
    this.spinner.show()
    this.containerService.addContainer(this.containerForm.value).subscribe(
      d => {
        this.containerForm.patchValue({
          containerId: d.containerId,
        })
        this.container = d
        this.toastr.success('ADDED')
      }, (err: any) => {
        this.spinner.hide()
        this.errorMsg = err;
      },
      () => {

        this.spinner.hide()

      })
  }

  deleteContainer() {
    if (this.containerForm.controls.containerId.value == 0) return;
    this.containerService.deleteContainer(this.containerForm.controls.containerId.value).subscribe(
      d => {
        this.spinner.hide();
        this.toastr.success("Container is deleted successfuly!");
        this.ngOnInit();
        this.container = d
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
