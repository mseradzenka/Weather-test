import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../../interfaces/weather.interfaces';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit {
  public weatherData: WeatherData;
  public isStopped = false;

  constructor(private weatherService: WeatherService) { }

  public ngOnInit(): void {
    this.getWeatherData();
  }

  public stopOrResumeListening(): void {
    if (!this.isStopped) {
      this.weatherService.stopListening();
    } else {
      this.getWeatherData();
    }
    this.isStopped = !this.isStopped;
  }

  private getWeatherData() {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      const params = {
        lat: latitude,
        lon: longitude
      };

      this.weatherService.startWeatherListening(params);
    });

    this.weatherService.weatherDataUpdated().subscribe(data => this.weatherData = data);
  }
}
