import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {StatisticsService} from "../../../service/statistics.service";
import *as Highcharts from "highcharts";

declare var require: any;
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data.src')(Highcharts);

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
  toTalCustomerRegisterPeriods: any[];
  day;
  days;
  message;

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
      if (dataToTalCustomerRegisterPeriod != null) {
        this.createChartTotalCustomer();
      } else {
        return this.message = 'Dữ liệu không tồn tại!'
      }
    });
  }

  // create chart total customer
  createChartTotalCustomer() {
    // @ts-ignore
    Highcharts.chart('statistic-customer', {

      chart: {
        type: 'column',
        backgroundColor: 'white',
      },
      title: {
        text: 'Biểu đồ số lượng khách hàng',
        style: {
          color: '#435d7d',
          font: 'bold 20px "Arial", Verdana, sans-serif'
        }
      },

      xAxis: {
        categories: this.toTalCustomerRegisterPeriods.map(x => x.create_date),
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
          text: 'Số lượng khách hàng'
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
            maxWidth: 600
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
          name: "Số lượng khách hàng ",
          colorByPoint: true,
          data: this.toTalCustomerRegisterPeriods.map(x => x.total_customer),
        }
      ],
    });
  }
}
