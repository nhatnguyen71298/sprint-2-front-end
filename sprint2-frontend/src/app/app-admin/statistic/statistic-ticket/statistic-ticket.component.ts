import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {StatisticsService} from '../../../service/statistics.service';
import * as Highcharts from 'highcharts';
import {MatDialog} from '@angular/material/dialog';
import {StatisticNotifyComponent} from '../statistic-notify/statistic-notify.component';

declare var require: any;
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data.src')(Highcharts);


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
  typeReport;
  monthYear;
  message;


  typeReports = [
    {value: 'week', valueView: 'Vé tuần'},
    {value: 'month', valueView: 'Vé tháng'},
    {value: 'year', valueView: 'Vé năm'},
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
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
  ) {
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
        if (dataTotalMemberCardWeek1 != null) {
          this.createChartWeek();
        } else {
          this.dialog.open(StatisticNotifyComponent, {
            width: '500px',
            disableClose: true,
          });
        }
      });
    } else if (this.typeReport === 'week' && this.monthYear.weekParam === '2') {
      this.statisticsService.getTotalMemberCardWeek2(this.monthYear).subscribe(dataTotalMemberCardWeek2 => {
        this.totalMemberCardWeek = dataTotalMemberCardWeek2;
        if (dataTotalMemberCardWeek2 != null) {
          this.createChartWeek();
        } else {
          this.dialog.open(StatisticNotifyComponent, {
            width: '500px',
            disableClose: true,
          });
        }
      });
    } else if (this.typeReport === 'week' && this.monthYear.weekParam === '3') {
      this.statisticsService.getTotalMemberCardWeek3(this.monthYear).subscribe(dataTotalMemberCardWeek3 => {
        this.totalMemberCardWeek = dataTotalMemberCardWeek3;
        if (dataTotalMemberCardWeek3 != null) {
          this.createChartWeek();
        } else {
          this.dialog.open(StatisticNotifyComponent, {
            width: '500px',
            disableClose: true,
          });
        }
      });
    } else if (this.typeReport === 'week' && this.monthYear.weekParam === '4') {
      this.statisticsService.getTotalMemberCardWeek4(this.monthYear).subscribe(dataTotalMemberCardWeek4 => {
        this.totalMemberCardWeek = dataTotalMemberCardWeek4;
        if (dataTotalMemberCardWeek4 != null) {
          this.createChartWeek();
        } else {
          this.dialog.open(StatisticNotifyComponent, {
            width: '500px',
            disableClose: true,
          });
        }
      });
    }
    // get data member card by month
    else if (this.typeReport === 'month') {
      this.statisticsService.getTotalMemberCardMonth(this.monthYear).subscribe(dataTotalMemberCardMonth => {
        this.totalMemberCardMonth = dataTotalMemberCardMonth;
        if (dataTotalMemberCardMonth != null) {
          this.createChartMonth();
        } else {
          this.dialog.open(StatisticNotifyComponent, {
            width: '500px',
            disableClose: true,
          });
        }
      });
    }
    // get data member card by year
    else {
      this.statisticsService.getTotalMemberCardYear(this.monthYear).subscribe(dataTotalMemberCardYear => {
        this.totalMemberCardYear = dataTotalMemberCardYear;
        if (dataTotalMemberCardYear != null) {
          this.createChartYear();
        } else {
          this.dialog.open(StatisticNotifyComponent, {
            width: '500px',
            disableClose: true,
          });
        }
      });
    }
  }

  // create chart data by week
  createChartWeek() {
    // @ts-ignore
    Highcharts.chart('statistic-member-card-week', {
      title: {
        text: 'Biểu đồ số lượng vé theo tuần',
        style: {
          color: '#435d7d',
          font: 'bold 20px "Arial", Verdana, sans-serif'
        }
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
          text: 'Số lượng (Đơn vị: Vé)'
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
        categories: this.totalMemberCardWeek.map(x => x.date),
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
      exporting: {
        filename: 'Số lượng vé theo tuần',
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      series: [{
        name: 'Số lượng vé theo tuần',
        data: this.totalMemberCardWeek.map(x => x.total_member_card),
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

  // create chart data by month
  createChartMonth() {
    // @ts-ignore
    Highcharts.chart('statistic-member-card-month', {
      title: {
        text: 'Biểu đồ số lượng vé theo tháng',
        style: {
          color: '#435d7d',
          font: 'bold 20px "Arial", Verdana, sans-serif'
        }
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
      chart: {
        backgroundColor: 'none',
      },
      exporting: {
        filename: 'Số lượng vé theo tháng',
      },
      yAxis: {
        title: {
          text: 'Số lượng (Đơn vị: Vé)'
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
        categories: this.totalMemberCardMonth.map(x => x.date),
        lineColor: 'black',
        labels: {
          style: {
            fontSize: '15px',
            color: 'black'
          }
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      series: [{
        name: 'Số lượng vé theo tháng',
        data: this.totalMemberCardMonth.map(x => x.total_member_card),
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

  // create chart data by year
  createChartYear() {
    // @ts-ignore
    Highcharts.chart('statistic-member-card-year', {
      title: {
        text: 'Biểu đồ số lượng vé theo năm',
        style: {
          color: '#435d7d',
          font: 'bold 20px "Arial", Verdana, sans-serif'
        }
      },
      exporting: {
        filename: 'Số lượng vé theo năm',
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
      chart: {
        backgroundColor: 'none',
      },
      yAxis: {
        title: {
          text: 'Số lượng (Đơn vị: Vé)'
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
        categories: this.totalMemberCardYear.map(x => x.date),
        lineColor: 'black',
        labels: {
          style: {
            fontSize: '15px',
            color: 'black'
          }
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      series: [{
        name: 'Số lượng vé',
        data: this.totalMemberCardYear.map(x => x.total_member_card),
        color: 'black',
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
