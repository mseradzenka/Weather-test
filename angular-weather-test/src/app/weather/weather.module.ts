import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { TempChartComponent } from './chart/temp-chart/temp-chart.component';
import { HumidityChartComponent } from './chart/humidity-chart/humidity-chart.component';

@NgModule({
  declarations: [
    WeatherComponent,
    TempChartComponent,
    HumidityChartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})

export class WeatherModule { }
