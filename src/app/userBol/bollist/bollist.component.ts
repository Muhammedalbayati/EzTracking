import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { BolService } from "../../Services";
import { Bol } from "../../models/bol";
import { TOASTR_TOKEN, Toastr } from "../../common";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "ez-bollist",
  templateUrl: "./bollist.component.html",
  styleUrls: ["./bollist.component.css"]
})
export class BollistComponent implements OnInit {
  // bols: Promise<IBol[]>;

  @Inject(TOASTR_TOKEN)
  private toastr: Toastr;

  bols: Bol[];
  selectedBol: Bol;
  errorMsg;
  constructor(
    private bolService: BolService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getBols();
  }

  getBols() {
    this.bolService.getBols().subscribe(
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

  // details(bol: Bol) {
  //   this.selectedBol = bol;
  //   localStorage.setItem("bol", JSON.stringify(bol));
  //   // //console.log(this.selectedBol);
  //   // this.router.navigate(["/bol/addbol", this.selectedBol]);
  // }
}
