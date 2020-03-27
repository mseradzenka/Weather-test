import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherData } from '../../../interfaces/weather.interfaces';
import { BaseChart } from '../base-chart';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-humidity-chart',
  templateUrl: './humidity-chart.component.html',
  styleUrls: ['./humidity-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HumidityChartComponent extends BaseChart implements AfterViewInit {
  @ViewChild('humidityChart', { static: false }) chartContainer: ElementRef;

  public chartData: WeatherData[] = [];

  constructor(
      private weatherService: WeatherService,
      private cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.weatherService.weatherDataUpdated()
        .subscribe((data: WeatherData) => {
          this.chartData.push(data);
          this.cdr.markForCheck();
          this.createChart(this.chartContainer, this.chartData, 'humidity');
        });
  }

}
