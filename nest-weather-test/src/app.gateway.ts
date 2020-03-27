import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
import { WeatherData, WeatherGeolocation } from './weather.interfaces';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private appService: AppService) { }

  public afterInit(): void {
    this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('start')
  public sendData(client: Socket, params: WeatherGeolocation): void {
    this.appService.stopGettingData();
    this.appService.getWeatherData(params)
      .subscribe((data: WeatherData) => {
          this.server.emit('weatherDataUpdated', data);
        }
      );
    this.logger.log('Started weather data listening');
  }

  @SubscribeMessage('stop')
  public stopSendingData(): void {
    this.appService.stopGettingData();
    this.logger.log('Stopped weather data listening');
  }
}
