import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { LocationsService } from 'src/app/Services';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'ez-buildingslist',
  templateUrl: './buildingslist.component.html',
  styleUrls: ['./buildingslist.component.css']
})
export class BuildingslistComponent implements OnInit {

  bldgLocations: any = []
  errorMsg: any
  _bldgLocation: any = {}
  @Input()
  set bldgLocation(val: any) {
    //console.log('val', val)
    if (val != null || val != undefined) {
      this._bldgLocation = val
    }
  }
  get bldgLocation() {
    return this._bldgLocation
  }

  @Output() selectedLocation = new EventEmitter();


  constructor(
    private locationService: LocationsService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getLocations();
  }

  onRowClick(data) {
    // //console.log(data)
    this.selectedLocation.emit(data)

  }

  getLocations() {
    this.spinner.show();
    this.locationService.getLocations().subscribe(
      data => {
        this.spinner.hide();
        this.bldgLocations = data;
        //console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

}
