import { Component, OnInit, Inject, EventEmitter, Output, Input } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from 'src/app/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContainerService } from 'src/app/Services';

@Component({
  selector: 'ez-containerlist',
  templateUrl: './containerlist.component.html',
  styleUrls: ['./containerlist.component.css']
})
export class ContainerlistComponent implements OnInit {
  containers: any = []
  errorMsg: any
  _container: any = {}
  @Input()
  set container(val: any) {
    //console.log('val', val)
    if (val != null || val != undefined) {
      this._container = val
    }
  }
  get container() {
    return this._container
  }

  @Output() selectedContainer = new EventEmitter();


  constructor(
    private containerService: ContainerService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getcontainers();
  }

  onRowClick(data) {
    // //console.log(data)
    this.selectedContainer.emit(data)

  }



  getcontainers() {
    this.spinner.show();
    this.containerService.getContainers().subscribe(
      data => {
        this.spinner.hide();
        this.containers = data;
        //console.log(data);
      },
      (err: any) => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }

}
