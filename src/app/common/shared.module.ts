import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleModalComponent } from './simpleModal.component';
import { ModalTriggerDirective } from './modalTrigger.directive';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HoverOverTextDirective } from './hover-over-text.directive';

import { CONFIG } from '../config';
const Urls = CONFIG.Urls;

import { SignalRModule, SignalR } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { SignalrService } from '../Services';
import { ChartComponent } from './chart/chart.component';
import { FilterPipe } from './filter.pipe';



export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'bolHub';
  c.qs = { user: 'donald' };
  c.url = Urls.serverUrl + "/signalrHubs";
  c.logging = false;
  return c;
}

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    SignalRModule.forRoot(createConfig),
    CommonModule
  ],
  declarations: [
    ModalTriggerDirective,
    SimpleModalComponent,
    SearchBoxComponent,
    HoverOverTextDirective,
    ChartComponent,
    FilterPipe,
  ],
  // providers: [SignalrService],
  exports: [SimpleModalComponent, ChartComponent, ModalTriggerDirective, SearchBoxComponent, HoverOverTextDirective,FilterPipe]
})
export class SharedModule { }
