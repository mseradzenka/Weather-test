import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { WeatherData } from '../../../interfaces/weather.interfaces';
import { WeatherService } from '../../weather.service';
import { BaseChart } from '../base-chart';

@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TempChartComponent extends BaseChart implements AfterViewInit {
  @ViewChild('tempChart', { static: false }) chartContainer: ElementRef;

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
          this.createChart(this.chartContainer, this.chartData, 'temp');
        });
  }
}
