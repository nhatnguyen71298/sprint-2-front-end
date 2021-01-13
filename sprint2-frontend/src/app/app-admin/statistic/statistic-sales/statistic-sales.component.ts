import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {StatisticsService} from "../../../service/statistics.service";
import *as Highcharts from "highcharts";
import {MatDialog} from "@angular/material/dialog";
import {StatisticNotifyComponent} from "../statistic-notify/statistic-notify.component";

declare var require: any;
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data.src')(Highcharts);

@Component({
  selector: 'app-statistic-sales',
  templateUrl: './statistic-sales.component.html',
  styleUrls: ['./statistic-sales.component.css']
})
export class StatisticSalesComponent implements OnInit {
  formStatisticRevenuePeriod: FormGroup;
  totalRevenueMemberCardPeriod: any[];
  totalRevenueTicketPeriod: any[];
  day;
  days;
  typeReport;
  typeReports = [
    {value: 'reMemberCard', valueView: 'Doanh thu vé thành viên'},
    {value: 'reTicket', valueView: 'Doanh thu vé ngày'}
  ];

  constructor(public formBuilder: FormBuilder,
              public statisticsService: StatisticsService,
              public dialog: MatDialog,
              public el: ElementRef) {
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
    if (this.formStatisticRevenuePeriod.valid) {
      // statistic total revenue member card in period time
      if (this.typeReport === 'reMemberCard') {
        this.statisticsService.getTotalRevenueMemberCardPeriod(this.days).subscribe(dataTotalRevenueMemberCardPeriod => {
          this.totalRevenueMemberCardPeriod = dataTotalRevenueMemberCardPeriod;
          console.log(dataTotalRevenueMemberCardPeriod);
          if (dataTotalRevenueMemberCardPeriod != null) {
            this.createChartRevenueMemberCard();
          } else {
            this.dialog.open(StatisticNotifyComponent, {
              width: '500px',
              disableClose: true,
            });
          }
        });
      }
      // statistic total revenue ticket in period time
      else {
        this.statisticsService.getTotalRevenueTicketPeriod(this.days).subscribe(dataTotalRevenueTicketPeriod => {
          this.totalRevenueTicketPeriod = dataTotalRevenueTicketPeriod;
          console.log(dataTotalRevenueTicketPeriod);
          if (dataTotalRevenueTicketPeriod != null) {
            this.createChartRevenueTicket();
          } else {
            this.dialog.open(StatisticNotifyComponent, {
              width: '500px',
              disableClose: true,
            });
          }
        });
      }
    } else {
      for (const KEY of Object.keys(this.formStatisticRevenuePeriod.controls)) {
        if (this.formStatisticRevenuePeriod.controls[KEY].invalid) {
          const INVALID_CONTROL = this.el.nativeElement.querySelector('[formControlName="' + KEY + '"]');
          INVALID_CONTROL.focus();
          break;
        }
      }
    }
  }

  // create chart statistic revenue member card
  createChartRevenueMemberCard() {
    // @ts-ignore
    Highcharts.chart('statistic-revenue-member-card', {

      title: {
        text: 'Biểu đồ doanh thu vé thành viên',
        style: {
          color: '#435d7d',
          font: 'bold 20px "Arial", Verdana, sans-serif'
        }
      },
      exporting: {
        filename: 'Doanh thu vé thành viên',
      },
      lang: {
        downloadCSV: 'Tải file CSV',
        downloadJPEG: 'Tải hình ảnh JPEG',
        downloadPDF: 'Tải file PDF',
        downloadPNG: 'Tải hình ảnh PNG',
        downloadSVG: 'Tải file SVG',
        downloadXLS: 'Tải file XLS',
        viewFullscreen: 'Hiện thị toàn màn hình',
        printChart: 'In',
        viewData: 'Hiện thị dữ liệu của bảng',
      },

      yAxis: {
        title: {
          text: 'Doanh thu (Đơn vị: VND)'
        },
        labels: {
          style: {
            fontSize: '15px',
            color: 'black'
          }
        }
      },

      xAxis: {
        title: {
          text: 'Thời gian',
          style: {
            fontSize: '15px',
            color: 'black',
          }
        },
        categories: this.totalRevenueMemberCardPeriod.map(x => x.date_payment),
        lineColor: 'black',
        labels: {
          style: {
            fontSize: '15px',
            color: 'black'
          }
        }
      },

      chart: {
        backgroundColor: 'none',
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      series: [{
        name: 'Doanh thu vé thành viên',
        data: this.totalRevenueMemberCardPeriod.map(x => x.total_price),
        color: 'red',
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });

  }

  // create chart statistic revenue ticket
  createChartRevenueTicket() {
    // @ts-ignore
    Highcharts.chart('statistic-revenue-ticket', {

      title: {
        text: 'Biểu đồ doanh thu vé ngày',
        style: {
          color: '#435d7d',
          font: 'bold 20px "Arial", Verdana, sans-serif'
        }
      },
      exporting: {
        filename: 'Doanh thu vé ngày',
      },
      lang: {
        downloadCSV: 'Tải file CSV',
        downloadJPEG: 'Tải hình ảnh JPEG',
        downloadPDF: 'Tải file PDF',
        downloadPNG: 'Tải hình ảnh PNG',
        downloadSVG: 'Tải file SVG',
        downloadXLS: 'Tải file XLS',
        viewFullscreen: 'Hiện thị toàn màn hình',
        printChart: 'In',
        viewData: 'Hiện thị dữ liệu của bảng',
      },
      yAxis: {
        title: {
          text: 'Doanh thu (Đơn vị: VND)'
        },
        labels: {
          style: {
            fontSize: '15px',
            color: 'black'
          }
        }
      },

      xAxis: {
        title: {
          text: 'Thời gian',
          style: {
            fontSize: '15px',
            color: 'black',
          }
        },
        categories: this.totalRevenueTicketPeriod.map(x => x.exit_date),
        lineColor: 'black',
        labels: {
          style: {
            fontSize: '15px',
            color: 'black'
          }
        }
      },

      chart: {
        backgroundColor: 'none',
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      series: [{
        name: 'Doanh thu vé ngày',
        data: this.totalRevenueTicketPeriod.map(x => x.total_price),
        color: 'blue',
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }
}
