import { Component, OnInit, Inject, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TOASTR_TOKEN, Toastr } from '..';
import { ChartsService } from 'src/app/Services/charts.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var Chart: any;

@Component({
  selector: 'ez-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  errorMsg: any

  @ViewChild('myChart') myChartEle: ElementRef;
  _lblArray: any[] = []
  _chartData: any[] = []
  @Input()
  set chartData(val: any) {
    console.log('val', val)
    if (val != null || val != undefined) {
      this._chartData = val
      this.myChart()
    }
  }
  get chartData() {
    return this._chartData
  }


  _chartType: any
  @Input()
  set chartType(val: any) {
    console.log('val', val)
    if (val != null || val != undefined) {
      this._chartType = val
    }
  }

  get chartType() {
    return this._chartType
  }

  _chartLabels: any
  @Input()
  set chartLabels(val: any) {
    console.log('val', val)
    if (val != null || val != undefined) {
      this._chartLabels = val
    }
  }

  get chartLabels() {
    return this._chartLabels
  }
  constructor() { }

  ngOnInit() {
    // this.myChart();
  }

  ngAfterViewInit() {
    if (this.myChartEle) {
      this.myChart()
    }
  }

  myChart() {


    var lbls = this.chartData.map(function (x) { return x.pickupLocation })
    var data = this.chartData.map(function (x) { return x.bolsCount })
    //*****************************/
    // var counts = this.chartData.reduce((p, c) => {
    //   var name = c.pickupLocation.toUpperCase();
    //   if (!p.hasOwnProperty(name)) {
    //     p[name] = 0;
    //   }
    //   p[name]++;
    //   return p;
    // }, {});
    // console.log(counts);
    // ****************************
    var ctx = this.myChartEle.nativeElement.getContext('2d') //document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: this.chartType || 'pie', //'bar',
      data: {
        labels: lbls,
        datasets: [{
          data: data,
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


