import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WeatherComponent} from './weather/weather/weather.component';


const routes: Routes = [
  {
    path: '**',
    redirectTo: 'weather'
  },
  {
    path: 'weather',
    component: WeatherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
