import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ContainerService, ItemService, PbgService } from "../../Services";
import { NgxSpinnerService } from "ngx-spinner";
import { Router,Route } from "@angular/router";
import { Container } from "../../models/container";
import { FormGroup, FormControl } from "@angular/forms";
import { Pbg } from "../../models/pbg";
import { Item } from "../../models/item";

@Component({
  selector: "ez-additem",
  templateUrl: "./additem.component.html",
  styleUrls: ["./additem.component.css"]
})
export class AdditemComponent implements OnInit {
  itemForm: FormGroup;
  containers: Container[] = [];
  pbgs: Pbg[] = [];
  items: Item[] = [];
  item: Item = new Item();
  @Output()
  addItemEvent = new EventEmitter();

  errorMsg: string = "";
  @Input()
  bol: any;

  bolId: FormControl = new FormControl({ value: 0, disabled: true });
  partInfo: FormControl = new FormControl("");
  qty: FormControl = new FormControl(0);
  container: FormControl = new FormControl();
  pbg: FormControl = new FormControl();
  piecesCount: FormControl = new FormControl(0);
  hazMat: FormControl = new FormControl(false);
  blanketOn: FormControl = new FormControl(false);
  shockedWatch: FormControl = new FormControl(false);
  damage: FormControl = new FormControl(false);

  constructor(
    private containerService: ContainerService,
    private pbgService: PbgService,
    private router: Router,
    private itemService: ItemService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getContainers();
    this.getPbgs();
    
    this.itemForm = new FormGroup({
      partInfo: this.partInfo,
      container: this.container,
      pbg: this.pbg,
      qty: this.qty,
      piecesCount: this.piecesCount,
      hazMat: this.hazMat,
      blanketOn: this.blanketOn,
      shockedWatch: this.blanketOn,
      damage: this.damage
    });
  }

  getContainers() {
    this.containerService.getContainers().subscribe(
      data => {
        this.containers = data;
      },
      err => (this.errorMsg = err)
    );
  }

  getPbgs() {
    this.pbgService.getPbgs().subscribe(
      data => {
        this.pbgs = data;
      },
      err => (this.errorMsg = err)
    );
  }
  saveItem(domValues: any) {
    //since the bolId is disabled in the bolForm we need to get the raw values using getRawValue
    //https://angular.io/api/forms/FormGroup
    //https://stackoverflow.com/questions/49675329/how-to-get-values-from-disabled-form-controls-in-a-form-group

     //console.log(this.bol);
    domValues.bolId = this.bol.get('bolId').value;
    // domValues.containerId=this.bol.containerId;
    // domValues.pbgId=this.bol['pbgId'];

    // this.item.bolId = domValues.bolId;
    // this.item.blanketOn = domValues.blanketOn;
    // this.container = domValues.container;
    domValues.pbgId = domValues.pbg.pbgId;
    domValues.pbgType = domValues.pbg.pbgType;
    domValues.containerId = domValues.container.containerId;
    domValues.containerType = domValues.container.containerType;

    //console.log(domValues);

    this.spinner.show();
    this.itemService.addItem(domValues).subscribe(
      data => {
        
        
        domValues.itemId=data.itemId;
        this.items.push(domValues);
        this.addItemEvent.emit(domValues);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.errorMsg = err;
      }
    );
  }
}
