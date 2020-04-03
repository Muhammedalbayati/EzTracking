import { Component, OnInit, Inject, ViewChild, ElementRef } from "@angular/core";
import { TOASTR_TOKEN, Toastr } from "../common/index";
import { ChartsService } from "../Services/charts.service";
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from "moment";
import { Last12MonthsChart } from "../models/Last12MonthsChart";
import { reduce } from "rxjs/operators";

declare var Chart: any;

@Component({
  selector: "ez-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  chartData: any[] = []
  cahrt_Labels: any[] = []

  last12MonthsChartLabels: string[] = []
  last12MonthsChartNumbers: number[] = []
  last12MonthsChartData: Last12MonthsChart[] = []
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
    this.getLastSixMonthsChartData();

  }




  getLastSixMonthsChartData() {
    this.spinner.show();
    var _data = [];
    this.chartsService.getLast12MonthsChartData().subscribe(
      data => {
        data.forEach(d => {
          _data.push(d)
          // //console.log(d)
        })
      },
      (err: any) => {
        this.errorMsg = err;
      }, () => {
        this.spinner.hide();
        this.last12MonthsChartData = _data
        _data.forEach(d => {
          this.last12MonthsChartLabels.push(d.monthName)
          this.last12MonthsChartNumbers.push(d.bolsCount)
        });
        this.myChart()
      }
    );
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
    var _data: Number[] = []
    var _lbls: string[] = []
    this.spinner.show();
    this.chartsService.getChartData(dateCriteria).subscribe(
      data => {
        data.forEach(d => {
          _data.push(d.bolsCount)
          _lbls.push(d.deliveryLocation)
        })
      },
      (err: any) => {
        this.errorMsg = err;
      }, () => {
        this.spinner.hide();

        this.chartData = _data
        this.cahrt_Labels = _lbls
        //console.log(this.cahrt_Labels)
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
      // this.sixMonthChart();
    }
  }

  myChart() {

    // var yearLabel = this.last12MonthsChartData.map(function (x) { return x.theYear })[0]
    // //console.log(yearLabel)
    var ctx = this.myChartEle.nativeElement.getContext('2d') //document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels:this.last12MonthsChartLabels, //["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        datasets: [{
          label: 'Bols Count',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          fill: true,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          pointBorderWidth: 1,
          pointBackgroundColor: 'rgb(255, 255, 0)',
          // pointStyle:'rectRounded',
          // pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          // hitRadius:10,
          data: this.last12MonthsChartNumbers  // [0, 10, 5, 2, 20, 30, 45]//this.chartData.map(function (x) { return x.bolsCount }) //
        }]
      },
      borderWidth: 1,
      // Configuration options go here
      options: this.chartOptions()
    });



  }

  // sixMonthChart() {
  //   var lbls = this.last12MonthsChartLabels; //this.last12MonthsChartData.map(function (x) { return x.monthName })
  //   var bolsCount = this.last12MonthsChartNumbers;//this.last12MonthsChartData.map(function (x) { return x.bolsCount })
  //   //*****************************/
  //   // var counts = this.chartData.reduce((p, c) => {
  //   //   var name = c.pickupLocation.toUpperCase();
  //   //   if (!p.hasOwnProperty(name)) {
  //   //     p[name] = 0;
  //   //   }
  //   //   p[name]++;
  //   //   return p;
  //   // }, {});
  //   // //console.log(counts);
  //   // ****************************
  //   var ctx = this.myChartEle.nativeElement.getContext('2d') //document.getElementById("myChart");
  //   var myChart = new Chart(ctx, {
  //     type: 'line', //'bar',
  //     data: {
  //       labels: lbls,
  //       datasets: [{
  //         data: bolsCount,
  // backgroundColor: [
  //   'rgba(255, 99, 132, 0.2)',
  //   'rgba(54, 162, 235, 0.2)',
  //   'rgba(255, 206, 86, 0.2)',
  //   'rgba(75, 192, 192, 0.2)',
  //   'rgba(153, 102, 255, 0.2)',
  //   'rgba(255, 159, 64, 0.2)'
  // ],
  //       }],
  //       borderWidth: 1,
  //       options: this.chartOptions()
  //     }
  //   });
  // }

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
