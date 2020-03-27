import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../interfaces/weather.interfaces';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
      private httpClient: HttpClient,
      private socket: Socket
  ) { }

  public weatherDataUpdated(): Observable<WeatherData> {
      return new Observable(observer =>
          this.socket.on('weatherDataUpdated', res => observer.next(res)));
  }

  public startWeatherListening(params) {
      this.socket.emit('start', params);
  }

  public stopListening(): void {
      this.socket.emit('stop');
  }
}
