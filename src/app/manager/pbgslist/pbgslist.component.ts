import { Component, OnInit, Inject, EventEmitter, Output, Input } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { PbgService } from 'src/app/Services';

@Component({
  selector: 'ez-pbgslist',
  templateUrl: './pbgslist.component.html',
  styleUrls: ['./pbgslist.component.css']
})
export class PbgslistComponent implements OnInit {
  pbgs: any = []
  errorMsg: any
  _pbg: any = {}
  @Input()
  set pbg(val: any) {
    console.log('val', val)
    if (val != null || val != undefined) {
      this._pbg = val
    }
  }
  get pbg() {
    return this._pbg
  }

  @Output() selectedPbg = new EventEmitter();


  constructor(
    private pbgService: PbgService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getPbgs();
  }

  onRowClick(data) {
    // console.log(data)
    this.selectedPbg.emit(data)

  }



  getPbgs() {
    this.spinner.show();
    this.pbgService.getPbgs().subscribe(
      data => {
        this.spinner.hide();
        this.pbgs = data;
        console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

}
