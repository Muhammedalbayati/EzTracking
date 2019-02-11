import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../models/item';


@Component({
  selector: 'ez-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items: any[] = []
  private _item: any

  @Input()
  set item(val: any) {
    // console.log('this item change from ' + JSON.stringify(this._item) + ' to ' + JSON.stringify(val))

    if(val==undefined)return
    this.items.push(val)
    this._item = val
  }

  get item(): any {
    return this._item;
  }

  errorMsg;
  itemId: number;
  idx: number;

  constructor() { }

  ngOnInit() {
    console.log(this.item)

  }

  showDeleteItemModal(itemId, idx) {
    this.itemId = itemId;
    this.idx = idx;
  }



}
