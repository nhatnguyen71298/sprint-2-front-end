import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import *as Highcharts from "highcharts";

declare var require: any;
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);


@Component({
  selector: 'app-statistic-car',
  templateUrl: './statistic-car.component.html',
  styleUrls: ['./statistic-car.component.css']
})
export class StatisticCarComponent implements OnInit {
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
    // @ts-ignore
    Highcharts.chart('statistic-car', {

      chart: {
        type: 'column',
        backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [
            [0, 'rgb(255, 255, 255)'],
            [1, 'rgb(240, 240, 255)']
          ]
        },
      },

      title: {
        text: 'Biểu đồ số lượng xe khách hàng',
        style: {
          color: '#435d7d',
          font: 'bold 20px "Arial", Verdana, sans-serif'
        }
      },

      xAxis: {
        categories: this.totalCarOfCustomers.map(x => x.full_name),
        lineColor: 'black',
        labels: {
          style: {
            fontSize: '15px',
            color: 'black'
          }
        }
      },

      yAxis: {
        title: {
          text: 'Số lượng xe'
        },
        labels: {
          style: {
            fontSize: '15px',
            color: 'black'
          }
        }
      },

      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          borderWidth: 1,
          dataLabels: {
            enabled: true,
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              enabled: false
            }
          }
        }]
      },

      colors: [
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
        'rgb(255, 99, 132)',
        'rgb(84, 255, 159)',
        'rgb(255, 77, 0)',
        'rgb(255, 165, 0)',
        'rgb(75, 0, 130)',
        'rgb(0, 0, 255)',
        'rgb(255,0,0)',
      ],
      series: [
        {
          name: "Số lượng xe ",
          colorByPoint: true,
          data: this.totalCarOfCustomers.map(x => x.total_car_customer),
        }
      ],
    });
  }
}
