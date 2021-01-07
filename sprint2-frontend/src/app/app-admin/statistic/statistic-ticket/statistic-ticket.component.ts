import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Chart} from 'chart.js';
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {StatisticsService} from "../../../service/statistics.service";

export const FORMATS_MONTH_YEAR = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'DD-MM-YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'DD-MM-YYYY',
  },
};

@Component({
  selector: 'app-statistic-ticket',
  templateUrl: './statistic-ticket.component.html',
  styleUrls: ['./statistic-ticket.component.css'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: FORMATS_MONTH_YEAR}]
})
export class StatisticTicketComponent implements OnInit {

  formStatisticMemberCard: FormGroup;
  totalMemberCardWeek: any[];
  totalMemberCardMonth: any[];
  totalMemberCardYear: any[];
  chartWeek: Chart;
  chartMonth: Chart;
  chartYear: Chart;
  typeReport;
  monthYear;

  typeReports = [
    {value: 'week', valueView: 'Thống kê vé tuần'},
    {value: 'month', valueView: 'Thống kê vé tháng'},
    {value: 'year', valueView: 'Thống kê vé năm'},
  ];

  weekParams = [
    {value: '1', valueView: 'Tuần 1'},
    {value: '2', valueView: 'Tuần 2'},
    {value: '3', valueView: 'Tuần 3'},
    {value: '4', valueView: 'Tuần 4'},
  ];

  monthParams = [
    {value: '1', valueView: 'Tháng 1'},
    {value: '2', valueView: 'Tháng 2'},
    {value: '3', valueView: 'Tháng 3'},
    {value: '4', valueView: 'Tháng 4'},
    {value: '5', valueView: 'Tháng 5'},
    {value: '6', valueView: 'Tháng 6'},
    {value: '7', valueView: 'Tháng 7'},
    {value: '8', valueView: 'Tháng 8'},
    {value: '9', valueView: 'Tháng 9'},
    {value: '10', valueView: 'Tháng 10'},
    {value: '11', valueView: 'Tháng 11'},
    {value: '12', valueView: 'Tháng 12'},
  ];
  yearParams = [
    {value: '2015', valueView: 'Năm 2015'},
    {value: '2016', valueView: 'Năm 2016'},
    {value: '2017', valueView: 'Năm 2017'},
    {value: '2018', valueView: 'Năm 2018'},
    {value: '2019', valueView: 'Năm 2019'},
    {value: '2020', valueView: 'Năm 2020'},
    {value: '2021', valueView: 'Năm 2021'},
    {value: '2022', valueView: 'Năm 2022'},
    {value: '2023', valueView: 'Năm 2023'},
    {value: '2024', valueView: 'Năm 2024'},
    {value: '2025', valueView: 'Năm 2025'},
  ];

  constructor(public statisticsService: StatisticsService,
              public formBuilder: FormBuilder) {
    this.formStatisticMemberCard = this.formBuilder.group({
      typeReport: ['', Validators.required],
      fromDay: ['', Validators.required],
      toDay: ['', Validators.required],
      week: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  
  openStatisticMemberCard() {
    // get type report statistic
    this.typeReport = this.formStatisticMemberCard.controls.typeReport.value;
    // get month year date from form
    this.monthYear = {
      weekParam: this.formStatisticMemberCard.controls.week.value,
      monthParam: this.formStatisticMemberCard.controls.month.value,
      yearParam: this.formStatisticMemberCard.controls.year.value,
    };
    // get data member card by week
    if (this.typeReport === 'week' && this.monthYear.weekParam === '1') {
      this.statisticsService.getTotalMemberCardWeek1(this.monthYear).subscribe(dataTotalMemberCardWeek1 => {
        this.totalMemberCardWeek = dataTotalMemberCardWeek1;
        this.createChartWeek();
      });
    } else if (this.typeReport === 'week' && this.monthYear.weekParam === '2') {
      this.statisticsService.getTotalMemberCardWeek2(this.monthYear).subscribe(dataTotalMemberCardWeek2 => {
        this.totalMemberCardWeek = dataTotalMemberCardWeek2;
        this.createChartWeek();
      });
    } else if (this.typeReport === 'week' && this.monthYear.weekParam === '3') {
      this.statisticsService.getTotalMemberCardWeek3(this.monthYear).subscribe(dataTotalMemberCardWeek3 => {
        this.totalMemberCardWeek = dataTotalMemberCardWeek3;
        this.createChartWeek();
      });
    } else if (this.typeReport === 'week' && this.monthYear.weekParam === '4') {
      this.statisticsService.getTotalMemberCardWeek4(this.monthYear).subscribe(dataTotalMemberCardWeek4 => {
        this.totalMemberCardWeek = dataTotalMemberCardWeek4;
        this.createChartWeek();
      });
    }
    // get data member card by month
    else if (this.typeReport === 'month') {
      this.statisticsService.getTotalMemberCardMonth(this.monthYear).subscribe(dataTotalMemberCardMonth => {
        this.totalMemberCardMonth = dataTotalMemberCardMonth;
        this.createChartMonth();
      });
    }
    // get data member card by year
    else {
      this.statisticsService.getTotalMemberCardYear(this.monthYear).subscribe(dataTotalMemberCardYear => {
        this.totalMemberCardYear = dataTotalMemberCardYear;
        this.createChartYear();
      });
    }
  }

  // create chart data by week
  createChartWeek() {
    this.chartWeek = new Chart('statistic-member-card-week', {
      type: 'line',
      data: {
        labels: this.totalMemberCardWeek.map(x => x.date),
        datasets: [
          {
            label: 'Doanh thu vé thành viên',
            data: this.totalMemberCardWeek.map(x => x.total_member_card),
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
          text: 'Biểu đồ thống kê vé theo tuần',
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

  // create chart data by month
  createChartMonth() {
    this.chartMonth = new Chart('statistic-member-card-month', {
      type: 'line',
      data: {
        labels: this.totalMemberCardMonth.map(x => x.date),
        datasets: [
          {
            label: 'Doanh thu vé thành viên',
            data: this.totalMemberCardMonth.map(x => x.total_member_card),
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
          text: 'Biểu đồ thống kê vé theo tháng',
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

  // create chart data by year
  createChartYear() {
    this.chartYear = new Chart('statistic-member-card-year', {
      type: 'line',
      data: {
        labels: this.totalMemberCardYear.map(x => x.date),
        datasets: [
          {
            label: 'Doanh thu vé thành viên',
            data: this.totalMemberCardYear.map(x => x.total_member_card),
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
          text: 'Biểu đồ thống kê vé theo năm',
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
