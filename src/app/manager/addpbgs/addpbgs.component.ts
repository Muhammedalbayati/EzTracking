import { Component, OnInit, Inject } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { PbgService } from 'src/app/Services';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'ez-addpbgs',
  templateUrl: './addpbgs.component.html',
  styleUrls: ['./addpbgs.component.css']
})
export class AddpbgsComponent implements OnInit {
  pbgForm: FormGroup;
  errorMsg: any;
  pbg: any = {}

  constructor(
    private pbgService: PbgService,
    private fb: FormBuilder,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.pbgForm = this.fb.group({
      pbgId: [{ value: null, disabled: true }],
      pbgType: [null, [Validators.required]],
    })
  }

  clearFrom() {
    this.pbgForm.reset();
  }

  fillpbgForm(pbg) {
    this.pbgForm.reset();
    this.pbgForm.patchValue({
      pbgId: pbg.pbgId,
      pbgType: pbg.pbgType,

    })

  }

  onPbgRowClicked(data: any) {
    //console.log(data)
    if (data === null || data === undefined) {
      return
    }
    this.fillpbgForm(data)
  }

  saveClick() {
    if (this.pbgForm.controls.pbgId.value !== null || this.pbgForm.controls.pbgId.value != undefined) {
      //console.log('update')
      this.updatePbg()
    } else {
      //console.log('new')
      this.addPbg()
    }
  }

  updatePbg() {
    this.errorMsg = ""
    this.spinner.show()
    this.pbgService.updatePbg(this.pbgForm.getRawValue()).subscribe(
      d => {
        // //console.log(d)
        this.toastr.success('UPDATED')
        this.pbg = d
        // this.pbgForm.patchValue({
        //   pbgId: d.pbgId,
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


  addPbg() {
    this.errorMsg = ""
    this.spinner.show()
    this.pbgService.addPbg(this.pbgForm.value).subscribe(
      d => {
        this.pbgForm.patchValue({
          pbgId: d.pbgId,
        })
        this.pbg = d
        this.toastr.success('ADDED')
      }, (err: any) => {
        this.spinner.hide()
        this.errorMsg = err;
      },
      () => {

        this.spinner.hide()

      })
  }

  deletePbg() {
    if (this.pbgForm.controls.pbgId.value == 0) return;
    this.pbgService.deletePbg(this.pbgForm.controls.pbgId.value).subscribe(
      d => {
        this.spinner.hide();
        this.toastr.success("Pbg is deleted successfuly!");
        this.ngOnInit();
        this.pbg = d
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
