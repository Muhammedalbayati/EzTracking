import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { CargoService } from 'src/app/Services';

@Component({
  selector: 'ez-cargolist',
  templateUrl: './cargolist.component.html',
  styleUrls: ['./cargolist.component.css']
})
export class CargolistComponent implements OnInit {
  cargos: any = []
  errorMsg: any
  _cargo: any = {}
  @Input()
  set cargo(val: any) {
    //console.log('val', val)
    if (val != null || val != undefined) {
      this._cargo = val
    }
  }
  get cargo() {
    return this._cargo
  }

  @Output() selectedCargo = new EventEmitter();


  constructor(
    private cargoService: CargoService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getcargos();
  }

  onRowClick(data) {
    // //console.log(data)
    this.selectedCargo.emit(data)

  }



  getcargos() {
    this.spinner.show();
    this.cargoService.getCargos().subscribe(
      data => {
        this.spinner.hide();
        this.cargos = data;
        //console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

}
