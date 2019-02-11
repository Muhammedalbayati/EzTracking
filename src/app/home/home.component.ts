import { Component, OnInit, Inject, ViewChild, ElementRef } from "@angular/core";
import { TOASTR_TOKEN, Toastr } from "../common/index";

declare var Chart: any;

@Component({
  selector: "ez-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  @ViewChild('donut') donut: ElementRef;

  constructor(
    @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

  ngOnInit() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green"],
        datasets: [{
          data: [12, 40, 3,20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],

        }],


        borderWidth: 1,
        options: this.barChartOption()
      }
    });
  }
  // 'rgba(255, 99, 132, 0.2)',
  // 'rgba(54, 162, 235, 0.2)',
  // 'rgba(255, 206, 86, 0.2)',
  // 'rgba(75, 192, 192, 0.2)',
  // 'rgba(153, 102, 255, 0.2)',
  // 'rgba(255, 159, 64, 0.2)'

  barChartOption() {
    var options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return options
  }






  showToastr() {
    this.toastr.success("Helo toastr");
    // this.parseJwt();
  }


}
