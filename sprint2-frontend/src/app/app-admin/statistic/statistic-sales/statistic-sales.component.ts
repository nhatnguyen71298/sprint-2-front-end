import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Chart} from 'chart.js';
import * as moment from 'moment';
import {StatisticsService} from "../../../service/statistics.service";

@Component({
  selector: 'app-statistic-sales',
  templateUrl: './statistic-sales.component.html',
  styleUrls: ['./statistic-sales.component.css']
})
export class StatisticSalesComponent implements OnInit {
  formStatisticRevenuePeriod: FormGroup;
  totalRevenueMemberCardPeriod: any[];
  totalRevenueTicketPeriod: any[];
  chartMemberCard: Chart;
  chartTicket: Chart;
  day;
  days;
  typeReport;
  typeReports = [
    {value: 'reMemberCard', valueView: 'Doanh thu vé thành viên'},
    {value: 'reTicket', valueView: 'Doanh thu vé ngày'}
  ];

  constructor(public formBuilder: FormBuilder,
              public statisticsService: StatisticsService) {
    this.formStatisticRevenuePeriod = this.formBuilder.group({
      fromDayPayment: ['', Validators.required],
      toDayPayment: ['', Validators.required],
      typeReport: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  openStatisticRevenuePeriod() {
    // get type report statistic (member card or ticket )
    this.typeReport = this.formStatisticRevenuePeriod.controls.typeReport.value;
    console.log(this.typeReport);
    // get data day from form group
    this.day = {
      fromDayPayment: this.formStatisticRevenuePeriod.controls.fromDayPayment.value,
      toDayPayment: this.formStatisticRevenuePeriod.controls.toDayPayment.value
    };
    // format data day
    this.days = {
      fromDayPayment: moment(this.day.fromDayPayment).format('YYYY-MM-DD'),
      toDayPayment: moment(this.day.toDayPayment).format('YYYY-MM-DD')
    };
    // statistic total revenue member card in period time
    if (this.typeReport === 'reMemberCard') {
      this.statisticsService.getTotalRevenueMemberCardPeriod(this.days).subscribe(dataTotalRevenueMemberCardPeriod => {
        this.totalRevenueMemberCardPeriod = dataTotalRevenueMemberCardPeriod;
        this.createChartRevenueMemberCard();
      });
    }
    // statistic total revenue ticket in period time
    else {
      this.statisticsService.getTotalRevenueTicketPeriod(this.days).subscribe(dataTotalRevenueTicketPeriod => {
        this.totalRevenueTicketPeriod = dataTotalRevenueTicketPeriod;
        this.createChartRevenueTicket();
      });
    }
  }

  // create chart statistic revenue member card
  createChartRevenueMemberCard() {
    this.chartMemberCard = new Chart('statistic-revenue-member-card', {
      type: 'line',
      data: {
        labels: this.totalRevenueMemberCardPeriod.map(x => x.date_payment),
        datasets: [
          {
            label: 'Doanh thu vé thành viên',
            data: this.totalRevenueMemberCardPeriod.map(x => x.total_price),
            backgroundColor: [
              'rgb(19,39,180)',
              'rgb(29,255,15)',
              'rgb(75, 0, 130)',
              'rgb(0,255,0)',
              'rgb(255,255,0)',
              'rgb(180,60,166)',
            ],
            fill: false,
            borderColor: 'red',
          },
        ]
      },
      options: {
        title: {
          text: 'Biểu đồ doanh thu',
          display: true
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Thời gian'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Đơn vị: VND'
            },
            ticks: {
              beginAtZero: true,
            }
          }]
        },
      }
    });
  }

  // create chart statistic revenue ticket
  createChartRevenueTicket() {
    this.chartTicket = new Chart('statistic-revenue-ticket', {
      type: 'line',
      data: {
        labels: this.totalRevenueTicketPeriod.map(x => x.enter_date),
        datasets: [
          {
            label: 'Doanh thu vé ngày',
            data: this.totalRevenueTicketPeriod.map(x => x.total_price),
            backgroundColor: [
              'rgb(19,39,180)',
              'rgb(29,255,15)',
              'rgb(75, 0, 130)',
              'rgb(0,255,0)',
              'rgb(255,255,0)',
              'rgb(180,60,166)',
            ],
            fill: false,
            borderColor: 'rgb(0,255,0)',
          },
        ]
      },
      options: {
        title: {
          text: 'Biểu đồ doanh thu',
          display: true
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Thời gian'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Đơn vị: VND'
            },
            ticks: {
              beginAtZero: true,
            }
          }]
        },
      }
    });
  }
}
