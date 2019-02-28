import { Component, OnInit, Inject, ViewChild, ElementRef } from "@angular/core";
import { TOASTR_TOKEN, Toastr } from "../common/index";
import { ChartsService } from "../Services/charts.service";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from "moment";

declare var Chart: any;

@Component({
  selector: "ez-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  chartData: any[] = []
  // lblArray: any[] = []
  errorMsg: any

  data: any[] = []

  constructor(
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private chartsService: ChartsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getChartData();
  }

  getChartData() {
    var date = moment.utc()
    var stillUtc = moment.utc(date).toDate();
    var fromDate = moment(stillUtc).subtract(30, "day").format("YYYY-MM-DD");
    var toDate = moment(stillUtc).format("YYYY-MM-DD");

    var dateCriteria = {
      fromDate: fromDate,
      toDate: toDate
    }
    var _data = []
    this.spinner.show();
    this.chartsService.getChartData(dateCriteria).subscribe(
      data => {
        data.forEach(d => {
          _data.push(d)
        })
      },
      (err: any) => {
        this.errorMsg = err;
      }, () => {
        this.spinner.hide();
        this.chartData = _data
      }
    );
  }

  showToastr() {
    this.toastr.success("Helo toastr");
    // this.parseJwt();
  }
}
