import { Component, OnInit } from '@angular/core';

import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-time-series-chart',
  templateUrl: './time-series-chart.component.html',
  styleUrls: ['./time-series-chart.component.scss']
})
export class TimeSeriesChartComponent implements OnInit {

  barsPerSlide = 7;
  timeSeriesData: any;
  selectedDate: any;
  slideIndexArray: Array<number> = [];

  // i am hardcoding the scales right now but this will need to be
  // updated on some logic which i am not clear as of now
  activeScale = 12;
  issueScale = 8;
  currentHour: any;
  activeSlideIndex: number;

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

    // populate slideIndex array
    const numOfSlides = Math.ceil(24 / this.barsPerSlide);
    for (let i = 0; i < numOfSlides; i++) {
      this.slideIndexArray.push(i);
    }

    // get active slide index based on current time
    this.currentHour = currentDate.getHours();
    this.activeSlideIndex = Math.floor(this.currentHour / this.barsPerSlide);
  }

  formatDate() {
    const date = this.selectedDate;
    return new Date(date.year, date.month - 1, date.day);
  }

}
