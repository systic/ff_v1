import { Component, OnInit } from '@angular/core';

import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-time-series-chart',
  templateUrl: './time-series-chart.component.html',
  styleUrls: ['./time-series-chart.component.scss']
})
export class TimeSeriesChartComponent implements OnInit {

  timeSeriesData: any;
  selectedDate: any;

  // i am hardcoding the scales right now but this will need to be
  // updated on some logic which i am not clear as of now
  activeScale = 12;
  issueScale = 8;

  constructor(private storesService: StoresService) { }

  ngOnInit() {
    this.storesService.getTimeSeriesData()
      .subscribe( response => {
        this.timeSeriesData = response;
      });

    // default selected date will be today
    const currentDate = new Date();
    this.selectedDate = {
      'year': currentDate.getFullYear(),
      'month': currentDate.getMonth() + 1,
      'day': currentDate.getDate()
    };
  }

  formatDate() {
    const date = this.selectedDate;
    return new Date(date.year, date.month - 1, date.day);
  }

}
