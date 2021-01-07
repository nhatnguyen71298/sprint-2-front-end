import {Chart} from 'chart.js';
import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-statistic-car',
  templateUrl: './statistic-car.component.html',
  styleUrls: ['./statistic-car.component.css']
})
export class StatisticCarComponent implements OnInit {
  chart: Chart;
  totalCarOfCustomers: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    // get data total car of customer
    this.totalCarOfCustomers = this.data.totalCarOfCustomers;
    this.createChart();
  }

  // create chart total car of customer
  createChart() {
    this.chart = new Chart('statistic-car', {
      type: 'bar',
      data: {
        labels: this.totalCarOfCustomers.map(x => x.full_name),
        datasets: [
          {
            data: this.totalCarOfCustomers.map(x => x.total_car_customer),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(84, 255, 159)',
              'rgb(255, 77, 0)',
              'rgb(255, 165, 0)',
              'rgb(75, 0, 130)',
              'rgb(0, 0, 255)',
              'rgb(255,0,0)',
              'rgb(0,255,0)',
              'rgb(255,255,0)',
              'rgb(128,0,0)',
              'rgb(128,128,128)',
            ],
          }
        ]
      },
      options: {
        legend: {
          position: 'bottom',
          display: false
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 50
          }
        },
        title: {
          display: true,
          text: 'Biểu đồ thống kê số lượng xe của khách hàng',
          position: 'bottom'
        },
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Đơn vị: Xe'
            },
          }]
        }
      }
    });
  }
}
