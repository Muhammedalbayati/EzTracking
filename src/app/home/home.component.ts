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
  @ViewChild('myChart') myChartEle: ElementRef;
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


  ngAfterViewInit() {
    if (this.myChartEle) {
      this.myChart()
    }
  }
  
  myChart() {
    var ctx = this.myChartEle.nativeElement.getContext('2d') //document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'line', //'pie', //'bar',
      data: {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        datasets: [{
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,

          borderWidth: 2,
          data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
        }],
        borderWidth: 1,
        options: this.chartOptions()
      }
    });
  }


  chartOptions() {
    var options = {

      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          // color: '#36A2EB',
          // anchor: 'center'
        }
      }
    }
    return options
  }
}
