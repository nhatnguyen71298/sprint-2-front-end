import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {StatisticCarComponent} from '../statistic-car/statistic-car.component';
import {StatisticsService} from "../../../service/statistics.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-statistic-overview',
  templateUrl: './statistic-overview.component.html',
  styleUrls: ['./statistic-overview.component.css']
})
export class StatisticOverviewComponent implements OnInit {
  chart: Chart;
  statisticsTotalBrandCar: any[];
  totalCustomer: number;
  totalEmployee: number;
  totalCarParking: number;
  totalParkingSlot: number;
  totalMemberCardTypes: any[];

  constructor(public statisticsService: StatisticsService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // get data total type car parking
    this.statisticsService.getToltalCarTypeParkingSlot().subscribe(dataTotalBrandCar => {
      this.statisticsTotalBrandCar = dataTotalBrandCar;
      this.createChart();
    });
    // get data total customer
    this.statisticsService.getTotalCustomer().subscribe(dataTotalCustomer => {
      this.totalCustomer = dataTotalCustomer;
    });
    // get data total employee
    this.statisticsService.getTotalEmployee().subscribe(dataTotalEmployee => {
      this.totalEmployee = dataTotalEmployee;
    });
    // get data total car parking
    this.statisticsService.getTotalCarParking().subscribe(dataTotalCarParking => {
      this.totalCarParking = dataTotalCarParking;
    });
    // get data parking slot
    this.statisticsService.getTotalParkingSlot().subscribe(dataTotalParkingSlot => {
      this.totalParkingSlot = dataTotalParkingSlot;
    });
    // get data total type member car
    this.statisticsService.getTotalMemberCardType().subscribe(dataTotalMemberCardType => {
      this.totalMemberCardTypes = dataTotalMemberCardType;
    });
  }

  // create chart statistic overview
  createChart() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.statisticsTotalBrandCar.map(x => x.brand_name),
        datasets: [
          {
            data: this.statisticsTotalBrandCar.map(x => x.total_car_type),
            backgroundColor: [
              'rgb(255, 165, 0)',
              'rgb(255, 99, 132)',
              'rgb(0, 0, 255)',
              'rgb(128,0,0)',
              'rgb(255, 77, 0)',
              'rgb(84, 255, 159)',
              'rgb(75, 0, 130)',
              'rgb(255,0,0)',
              'rgb(0,255,0)',
              'rgb(255,255,0)',
              'rgb(128,128,128)',
              'rgb(250,44,136)',
              'rgb(178,73,9)',
              'rgb(78,216,202)',
              'rgb(229,157,220)',
              'rgb(217,79,141)',
              'rgb(39,207,190)',
              'rgb(151,156,58)',
              'rgb(240,108,4)',
              'rgb(73,157,205)',
            ],
            responsive: true
          }
        ]
      },
      options: {
        legend: {
          position: 'left'
        },
        layout: {
          padding: {
            left: 45,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        animationEnabled: true,
        exportEnabled: true,
        title: {
          display: true,
          text: 'Biểu đồ số lượng hãng xe',
          position: 'bottom',
          fontSize: 15,
          fontColor: '#435d7d',
          padding: 10
        },
        responsive: true,
      }
    });
  }

  // dialog statistic total car of customer
  openDialogTotalCarCustomer(): void {
    this.statisticsService.getTotalCarOfCustomer().subscribe(dataTotalCarOfCustomer => {
      const dialogRef = this.dialog.open(StatisticCarComponent, {
        width: '1200px',
        height: '700px',
        data: {totalCarOfCustomers: dataTotalCarOfCustomer},
        disableClose: true
      });
    });
  }
}
