import { HttpService, Injectable, OnModuleDestroy } from '@nestjs/common';
import { interval, Observable, of, Subject } from 'rxjs';
import { WeatherData, WeatherResponse } from './weather.interfaces';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { API_URL } from './consts/api.const';
import { APPID } from './consts/appid.const';

@Injectable()
export class AppService implements OnModuleDestroy {
  private destroy$: Subject<any> = new Subject;

  constructor(private httpService: HttpService) { }

  public onModuleDestroy(): any {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getWeatherData(queryParams): Observable<WeatherData> {
    const params = {
      ...queryParams,
      appid: APPID,
      units: 'metric'
    };

    return interval(10000)
      .pipe(
        switchMap(() => this.httpService.get<WeatherResponse>(API_URL, { params })),
        filter(({ data }) => Boolean(data && data.main)),
        map(({ data }) => {
          const { main: { temp, humidity }, sys: { country }, name } = data;
          return {
            time: new Date().toISOString(),
            temp: temp.toString(),
            city: name,
            humidity,
            country
          };
        }),
        catchError(err => of(err)),
        takeUntil(this.destroy$)
      );
  }

  public stopGettingData(): void {
    this.destroy$.next();
  }
}
