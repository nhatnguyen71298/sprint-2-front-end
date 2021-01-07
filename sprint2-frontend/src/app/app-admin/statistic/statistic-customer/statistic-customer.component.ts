import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Chart} from 'chart.js';
import {StatisticsService} from "../../../service/statistics.service";

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-statistic-customer',
  templateUrl: './statistic-customer.component.html',
  styleUrls: ['./statistic-customer.component.css']
})
export class StatisticCustomerComponent implements OnInit {
  formStatisticCustomerRegisterPeriod: FormGroup;
  chart: Chart;
  toTalCustomerRegisterPeriods: any[];
  day;
  days;

  constructor(public formBuilder: FormBuilder,
              public statisticsService: StatisticsService) {
    this.formStatisticCustomerRegisterPeriod = this.formBuilder.group({
      fromDay: ['', Validators.required],
      toDay: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  openStatisticCustomerRegisterPeriod() {
    // get data day from form group
    this.day = {
      fromDay: this.formStatisticCustomerRegisterPeriod.controls.fromDay.value,
      toDay: this.formStatisticCustomerRegisterPeriod.controls.toDay.value,
    };
    // convert day to string by 'moment'
    this.days = {
      fromDay: moment(this.day.fromDay).format('YYYY-MM-DD'),
      toDay: moment(this.day.toDay).format('YYYY-MM-DD'),
    };
    // statistic total customer in period time
    this.statisticsService.getToTalCustomerRegisterPeriod(this.days).subscribe(dataToTalCustomerRegisterPeriod => {
      this.toTalCustomerRegisterPeriods = dataToTalCustomerRegisterPeriod;
      this.createChartTotalCustomer();
    });
  }

  // create chart total customer
  createChartTotalCustomer() {
    this.chart = new Chart('statistic-customer', {
      type: 'bar',
      data: {
        labels: this.toTalCustomerRegisterPeriods.map(x => x.create_date),
        datasets: [
          {
            data: this.toTalCustomerRegisterPeriods.map(x => x.total_customer),
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
            left: 70,
            right: 0,
            top: 20,
            bottom: 30
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
            }
          }]
        }
      }
    });
  }
}
