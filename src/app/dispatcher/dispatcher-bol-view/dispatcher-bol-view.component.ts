import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ez-dispatcher-bol-view',
  templateUrl: './dispatcher-bol-view.component.html',
  styleUrls: ['./dispatcher-bol-view.component.css']
})
export class DispatcherBolViewComponent implements OnInit {

  _bolId: any
  @Input()
  set bolId(val: any) {
    //console.log('val', val)
    if (val != null || val != undefined) {
      this._bolId = val
      // this.getBolById(this._bolId)
      // this.fillTheForm()
    }
    // this.fillTheForm(this._bolId);
  }
  get bolId() {

    return this._bolId
  }
  
  constructor() { }

  ngOnInit() {
  }

}
