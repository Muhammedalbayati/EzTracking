import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { BolService } from "../../Services";
import { Bol } from "../../models/bol";
import { TOASTR_TOKEN, Toastr } from "../../common";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'ez-submitted-bol-list',
  templateUrl: './submitted-bol-list.component.html',
  styleUrls: ['./submitted-bol-list.component.css']
})
export class SubmittedBolListComponent implements OnInit {

    // bols: Promise<IBol[]>;

    @Inject(TOASTR_TOKEN)
    private toastr: Toastr;
  
    bols: Bol[]=[];
    selectedBol: Bol;
    errorMsg;
    constructor(
      private bolService: BolService,
      private spinner: NgxSpinnerService
    ) { }
  
    ngOnInit() {
      this.spinner.show();
      this.getSubmittedBols();
    }
  
    getSubmittedBols() {
      this.bolService.getUserIsSubmittedBols(true).subscribe(
        data => {
          this.spinner.hide();
          this.bols = data;
          //console.log(data);
        },
        (err: any) => {
          this.spinner.hide();
          this.errorMsg = err;
        }
      );
  
    }

}
